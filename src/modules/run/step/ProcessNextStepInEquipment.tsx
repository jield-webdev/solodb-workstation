import type { ModuleComponent } from "../../ModuleComponent";
import {
  getEquipment,
  getEquipmentModule,
  listRuns,
  type Equipment,
  type Run,
} from "@jield/solodb-typescript-core";
import {
  RunStepExecuteMinimal,
  SelectRunWithQrScanner,
  ModuleStatusElement,
  BatchCardElement,
} from "@jield/solodb-react-components";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import LinkToSoloDb from "../../../components/LinkToSoloDB";

const ProcessNextStepInEquipment: ModuleComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>();
  const [activeRunId, setActiveRunId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["equipment", id],
        queryFn: () => getEquipment({ id: Number(id) }),
      },
      {
        queryKey: ["run", "to_process", equipment?.id],
        queryFn: () =>
          listRuns({ firstUnfinishedStepEquipment: equipment ?? undefined }),
      },
      {
        queryKey: ["equipment", equipment?.id],
        queryFn: () => getEquipmentModule({ id: Number(equipment?.id) }),
      },
    ],
  });

  const reloadQueriesByKey = (key: any[]) => {
    queryClient.refetchQueries({ queryKey: key });
  };

  const [equipmentQuery, runsQuery, moduleQuery] = queries;

  useEffect(() => {
    if (equipmentQuery.data?.id !== equipment?.id) {
      setEquipment(equipmentQuery.data);
    }
  }, [equipmentQuery]);

  const runsToProcess =
    runsQuery.data?.items.filter((run) => run.first_unfinished_step) ?? [];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const activeRun = useMemo(
    () => runsToProcess.find((run) => run.id == activeRunId),
    [activeRunId, runsToProcess],
  );

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
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div>
          <div className="text-uppercase small text-secondary">
            Process next step in equipment:
          </div>
          <div className="h5 mb-1">
            {equipment?.name ?? "Unknown equipment"}
            {moduleQuery.data && (
              <span className="ms-2">
                <ModuleStatusElement module={moduleQuery.data} />
              </span>
            )}
          </div>
        </div>
        <SelectRunWithQrScanner
          setRun={(run: Run) => setActiveRunId(run.id)}
          runsList={runsToProcess}
        />
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
        <div className="border rounded-3 p-3">
          {activeRun.first_unfinished_step && (
            <>
              <div className="d-flex align-items-start gap-3">
                <div className="d-flex flex-column">
                  <h5>
                    Run:{" "}
                    <LinkToSoloDb
                      path={`operator/run/details/${activeRun.id}/steps`}
                      text={activeRun.name}
                    />
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
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessNextStepInEquipment;
