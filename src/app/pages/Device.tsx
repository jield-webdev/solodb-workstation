import {useAuth} from "../../auth/hooks/useAuth";
import {useParams} from "react-router-dom";
import ModuleComponentRenderer from "../../modules/ModuleComponentRenderer";
import {type Equipment, getEquipment} from "@jield/solodb-typescript-core";
import {useQuery} from "@tanstack/react-query";

export default function Device() {
    const {user} = useAuth();
    const {id} = useParams();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["equipment", id],
        queryFn: () => getEquipment({'id': Number(id)}),
        enabled: Boolean(user && id),
    });

    const equipment: Equipment | null = data ?? null;

    return (
        <div className="container-fluid py-4">
            <div>
                <h1 className="display-6 mb-1">
                    {equipment?.name ?? "Loading device..."}
                </h1>
            </div>

            {isLoading && (
                <div
                    className="alert alert-info d-flex align-items-center gap-2"
                    role="alert"
                >
          <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
          />
                    Loading device data...
                </div>
            )}

            {isError && (
                <div className="alert alert-danger" role="alert">
                    {error instanceof Error ? error.message : "Could not load device."}
                </div>
            )}


            <div className="row">
                <div className="col-lg">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                <h2 className="h6 mb-0">Modules</h2>
                            </div>
                            {equipment?.dashboard_components.length ? (
                                <div className="row g-3">
                                    {equipment.dashboard_components.map((moduleName) => (
                                        <div key={moduleName} className="border rounded-3 p-3 h-100 bg-body-tertiary">
                                            <ModuleComponentRenderer moduleName={moduleName.valueOf()}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-secondary">
                                    No modules configured for this device yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
