import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import devicesRegistryDev from "../../data/sources/json/devicesRegistryDev.json";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container py-4">
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
        <span className="badge text-bg-secondary">Demo dataset</span>
      </div>

      <div className="row g-3">
        {devicesRegistryDev.map((device) => (
          <div className="col-md-6 col-lg-4" key={device.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <h3 className="h6 mb-1">{device.displayName}</h3>
                    <div className="text-secondary small">Device ID {device.id}</div>
                  </div>
                  <span className="badge text-bg-primary">{device.modules.length} modules</span>
                </div>
                <div className="mt-3 d-flex flex-wrap gap-2">
                  {device.modules.length > 0 ? (
                    device.modules.map((moduleName) => (
                      <span key={moduleName} className="badge text-bg-light border text-dark">
                        {moduleName}
                      </span>
                    ))
                  ) : (
                    <span className="text-secondary small">No modules configured</span>
                  )}
                </div>
              </div>
              <div className="card-footer bg-transparent border-top-0 pt-0">
                <Link className="btn btn-outline-primary w-100" to={`/device/${device.id}`}>
                  Open device
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
