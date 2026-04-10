import type { ModuleComponent } from "../../ModuleComponent";
import { listRuns } from "@jield/solodb-typescript-core";
import {
  RunStepExecuteMinimal,
  BatchCardElement,
  useSelectRunWithScanner,
  useScannerContext,
} from "@jield/solodb-react-components";
import {
  useQueries,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { useEffect, useId, useMemo, useState } from "react";
import LinkToSoloDb from "../../../components/LinkToSoloDB";
import { useDevice } from "../../../device/hooks/useDevice.ts";

const ProcessNextStepInEquipment: ModuleComponent = () => {
  const { equipment } = useDevice();

  const queryClient = useQueryClient();

  const [runsQuery] = useQueries({
    queries: [
      {
        queryKey: ["run", "to_process", equipment?.id],
        queryFn: () =>
          listRuns({ firstUnfinishedStepEquipment: equipment ?? undefined }),
        enabled: Boolean(equipment),
      },
    ],
  });

  const reloadQueriesByKey = (key: QueryKey) => {
    queryClient.refetchQueries({ queryKey: key });
  };

  const runsToProcess = useMemo(
    () =>
      runsQuery.data?.items.filter((run) => run.first_unfinished_step) ?? [],
    [runsQuery.data],
  );

  const isLoading = runsQuery.isLoading;
  const isError = runsQuery.isError;

  const { selectedRun } = useSelectRunWithScanner({ runsList: runsToProcess });
  const { addReadingCallbackFn, removeReadingCallbackFn } = useScannerContext();
  const callbackId = useId();
  const [readingKeys, setReadingKeys] = useState<string>("");

  useEffect(() => {
    addReadingCallbackFn(callbackId, setReadingKeys);
    return () => removeReadingCallbackFn(callbackId);
  }, []);

  if (isError) {
    return (
      <div className="alert alert-danger mb-0" role="alert">
        Could not load the next steps for this equipment.
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="h5 mb-0">Batch processing</h2>
      </div>

      {!selectedRun && isLoading && (
        <div className="d-flex flex-column gap-2">
          <div className="card shadow-sm">
            <div className="card-body py-3 d-flex justify-content-between align-items-center">
              <div className="placeholder-glow w-75">
                <div className="placeholder col-7 mb-1" />
                <div
                  className="placeholder col-5"
                  style={{ height: "0.75rem" }}
                />
              </div>
              <span className="placeholder-glow">
                <span
                  className="placeholder col-12"
                  style={{ width: 64, height: "1.5rem" }}
                />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LIST OF RUNS TO PROCESS */}
      {!selectedRun && !isLoading && (
        <>
          {runsToProcess.length === 0 ? (
            <div className="border rounded-3 p-4 text-center text-secondary">
              <div className="fw-semibold mb-1">
                Nothing to process right now
              </div>
              <div className="small">
                All runs for this equipment are complete or paused.
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2 mb-3">
              {runsToProcess.map((run) => (
                <div key={run.id} className="card shadow-sm">
                  <div className="card-body py-3 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{run.name}</div>
                      {run.first_unfinished_step && (
                        <div className="text-secondary small mt-1">
                          Next: {run.first_unfinished_step.name}
                        </div>
                      )}
                    </div>
                    <span className="badge text-bg-warning px-3 py-2">
                      {run.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* THE STEP TO PROCESS*/}
      {selectedRun && (
        <div className="bg-body-primary">
          {selectedRun.first_unfinished_step && (
            <>
              <div className="d-flex align-items-start gap-3">
                <div className="d-flex flex-column">
                  <h5>
                    Run:{" "}
                    <LinkToSoloDb
                      path={`operator/run/details/${selectedRun.id}/steps`}
                      text={selectedRun.name}
                    />{" "}
                    <span>({selectedRun.label})</span>
                  </h5>
                  <h5>
                    Step:{" "}
                    <LinkToSoloDb
                      path={`operator/run/step/${selectedRun.first_unfinished_step.id}`}
                      text={selectedRun.first_unfinished_step.name}
                    />
                  </h5>
                </div>
                {selectedRun.batch_card !== undefined && (
                  <div className="flex-grow-1 m-0">
                    <BatchCardElement run={selectedRun} />
                  </div>
                )}
              </div>
              <RunStepExecuteMinimal
                run={selectedRun}
                runStep={selectedRun.first_unfinished_step}
                showOnlyEmphasizedParameters={false}
                reloadRunStepFn={() => {
                  reloadQueriesByKey(["run", "to_process", equipment?.id]);
                }}
              />
            </>
          )}
        </div>
      )}
      <span>Reading from scanner: {readingKeys}</span>
    </div>
  );
};

export default ProcessNextStepInEquipment;
