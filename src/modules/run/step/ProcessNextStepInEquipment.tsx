import type { ModuleComponent } from "../../ModuleComponent";
import {
  getEquipment,
  listRuns,
  type Equipment,
} from "@jield/solodb-typescript-core";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkToSoloDb from "../../../components/LinkToSoloDB";

export const ProcessNextStepInEquipment: ModuleComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>();

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
    ],
  });

  const [equipmentQuery, runsQuery] = queries;

  useEffect(() => {
    if (equipmentQuery.data?.id !== equipment?.id) {
      setEquipment(equipmentQuery.data);
    }
  }, [equipmentQuery]);

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

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

  const runsToProcess = runsQuery.data?.items ?? [];

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <div className="text-uppercase small text-secondary">Equipment</div>
          <div className="h5 mb-1">
            {equipment?.name ?? "Unknown equipment"}
          </div>
        </div>
      </div>

      {runsToProcess.length === 0 ? (
        <div className="border rounded-3 p-4 text-center">
          <div className="fw-semibold mb-1">Nothing to process right now</div>
          <div className="text-secondary small">
            All runs for this equipment are complete or paused.
          </div>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {runsToProcess.map((run) => (
            <div key={run.id} className="list-group-item px-0 py-3">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <div className="fw-semibold">Run: {run.name}</div>
                  <span className="badge rounded-pill text-bg-warning text-dark">
                    {run.label}
                  </span>
                </div>
              </div>

              {run.first_unfinished_step && (
                <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                  <LinkToSoloDb
                    path={`operator/run/step/${run.first_unfinished_step.id}`}
                    text={run.first_unfinished_step.name}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProcessNextStepInEquipment;
