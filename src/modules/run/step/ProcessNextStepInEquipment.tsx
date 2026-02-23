import type { ModuleComponent } from "../../ModuleComponent";
import {
  listRuns,
  type Run,
} from "@jield/solodb-typescript-core";
import {
  RunStepExecuteMinimal,
  NavigateInRunWithQrScanner,
  BatchCardElement,
} from "@jield/solodb-react-components";
import {
  useQueries,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import LinkToSoloDb from "../../../components/LinkToSoloDB";
import { waitUntilNotNullish } from "../../../helpers/waitUntilNotNullish";
import {useDevice} from "../../../device/hooks/useDevice.ts";

const ProcessNextStepInEquipment: ModuleComponent = () => {
  const { equipment } = useDevice();

  const [activeRunId, setActiveRunId] = useState<number | null>(null);

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

  // handle selecting runStepParts
  const toggleRunPartRef = useRef<{
    setPart: (part: number) => void;
    setPartByLabel: (label: string) => void;
  } | null>(null);

  const runsToProcess = useMemo(
    () =>
      runsQuery.data?.items.filter((run) => run.first_unfinished_step) ?? [],
    [runsQuery.data],
  );

  const isLoading = runsQuery.isLoading;
  const isError = runsQuery.isError;

  const activeRun = useMemo(
    () => runsToProcess.find((run) => run.id == activeRunId),
    [activeRunId, runsToProcess],
  );

  const setRunPartByLabel = async (label: string) => {
    await waitUntilNotNullish(() => toggleRunPartRef.current);
    toggleRunPartRef.current?.setPartByLabel(label);
  };

  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-2 text-secondary">
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        <span>Loading next steps…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger mb-0" role="alert">
        Could not load the next steps for this equipment.
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
        <NavigateInRunWithQrScanner
          setRun={(run: Run) => setActiveRunId(run.id)}
          runsList={runsToProcess}
          setRunPartId={(part: number) =>
            toggleRunPartRef.current?.setPart(part)
          }
          setRunPartLabel={setRunPartByLabel}
        />
        <div className="medium text-secondary">
          Process next step in equipment
        </div>
      </div>

      {/* LIST OF RUNS TO PROCESS */}
      {!activeRun && (
        <>
          {runsToProcess.length === 0 ? (
            <div className="border rounded-3 p-4 text-center">
              <div className="fw-semibold mb-1">
                Nothing to process right now
              </div>
              <div className="text-secondary small">
                All runs for this equipment are complete or paused.
              </div>
            </div>
          ) : (
            <ul className="list-unstyled mb-3">
              {runsToProcess.map((run) => (
                <li key={run.id} className="mb-2">
                  <button
                    className={`btn btn-outline-secondary w-100 text-start d-flex align-items-center justify-content-between ${
                      activeRunId === run.id ? "active" : ""
                    }`}
                    onClick={() => setActiveRunId(run.id)}
                    type="button"
                  >
                    <span>{run.name}</span>
                    <span className="badge rounded-pill text-bg-warning text-dark small">
                      {run.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* THE STEP TO PROCESS*/}
      {activeRun && (
        <div className="bg-body-primary">
          {activeRun.first_unfinished_step && (
            <>
              <div className="d-flex align-items-start gap-3">
                <div className="d-flex flex-column">
                  <h5>
                    Run:{" "}
                    <LinkToSoloDb
                      path={`operator/run/details/${activeRun.id}/steps`}
                      text={activeRun.name}
                    />{" "}
                    <span>({activeRun.label})</span>
                  </h5>
                  <h5>
                    Step:{" "}
                    <LinkToSoloDb
                      path={`operator/run/step/${activeRun.first_unfinished_step.id}`}
                      text={activeRun.first_unfinished_step.name}
                    />
                  </h5>
                </div>
                {activeRun.batch_card !== undefined && (
                  <div className="flex-grow-1 m-0">
                    <BatchCardElement run={activeRun} />
                  </div>
                )}
              </div>
              <RunStepExecuteMinimal
                run={activeRun}
                runStep={activeRun.first_unfinished_step}
                showOnlyEmphasizedParameters={false}
                reloadRunStepFn={() => {
                  reloadQueriesByKey(["run", "to_process", equipment?.id]);
                }}
                toggleRunPartRef={toggleRunPartRef}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessNextStepInEquipment;
