import {Link} from "react-router-dom";
import {useAuth} from "../../auth/hooks/useAuth";
import {useQuery} from "@tanstack/react-query";
import {type Equipment, listEquipment} from "@jield/solodb-typescript-core";

export default function Dashboard() {
    const {user} = useAuth();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["equipment"],
        queryFn: () => listEquipment({}),
        enabled: Boolean(user),
    });

    const equipment: Equipment[] = data?.items ?? []

    return (
        <div className="container-fluid py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                    <h1 className="display-6 mb-1">Equipment Workstation</h1>
                    <p className="text-secondary mb-0">
                        Demo workspace that highlights devices, modules, and recent activity.
                    </p>
                </div>
                <div className="text-end">
                    <div className="small text-secondary">Signed in as</div>
                    <div className="fw-semibold">{user?.full_name ?? "Guest"}</div>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="h5 mb-0">Devices</h2>
                <span className="badge text-bg-secondary">Live data</span>
            </div>

            {isLoading && (
                <div
                    className="alert alert-info d-flex align-items-center gap-2"
                    role="alert"
                >
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"/>
                    Loading devices...
                </div>
            )}

            {isError && (
                <div className="alert alert-danger" role="alert">
                    {error instanceof Error
                        ? error.message
                        : "Could not load devices."}
                </div>
            )}



            <div className="row g-3">
                {equipment.map((equipment) => (
                    <div className="col-md-6 col-lg-4" key={equipment.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start gap-2">
                                    <div>
                                        <h3 className="h6 mb-1">{equipment.name}</h3>
                                        <div className="text-secondary small">Equipment ID {equipment.id}</div>
                                    </div>
                                    <span className="badge text-bg-primary">{equipment.dashboard_components.length} components</span>
                                </div>
                                <div className="mt-3 d-flex flex-wrap gap-2">
                                    {equipment.dashboard_components.length > 0 ? (
                                        equipment.dashboard_components.map((moduleName) => (
                                            <span key={moduleName} className="badge text-bg-light border text-dark">
                        {moduleName}
                      </span>
                                        ))
                                    ) : (
                                        <span className="text-secondary small">No components configured</span>
                                    )}
                                </div>
                            </div>
                            <div className="card-footer bg-transparent border-top-0 pt-0">
                                <Link className="btn btn-outline-primary w-100" to={`/device/${equipment.id}`}>
                                    Open device
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                {!isLoading && equipment.length === 0 && (
                    <div className="col-12">
                        <div className="border rounded-3 p-4 text-center text-secondary">
                            No devices available.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
