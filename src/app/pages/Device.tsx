import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { useParams } from "react-router-dom";
import type { DeviceSummary } from "../../types/device/deviceSummary";
import { getDevice } from "../../data/repositories/device/getDevice";
import ModuleComponentRenderer from "../../modules/ModuleComponentRenderer";

export default function Device() {
  const { user } = useAuth();
  const { id } = useParams();

  const [device, setDevice] = useState<DeviceSummary>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    setIsLoading(true);
    setError(null);
    getDevice(Number(id), user)
      .then(setDevice)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [user, id]);

  const formatModuleName = (moduleName: string) =>
    moduleName.replace(/([A-Z])/g, " $1").replace(/\s+/g, " ").trim();

  return (
    <div className="container py-4">
      <div className="mb-4">
        <div className="text-secondary small">Device workspace</div>
        <h1 className="display-6 mb-1">{device?.displayName ?? "Loading device..."}</h1>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="badge text-bg-dark">ID {id}</span>
          <span className="badge text-bg-secondary">Demo data</span>
          <span className="text-secondary small">User: {user?.full_name ?? "Guest"}</span>
        </div>
      </div>

      {isLoading && (
        <div className="alert alert-info d-flex align-items-center gap-2" role="alert">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading device data...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h6 mb-3">{device?.displayName}</h2>
              <div className="d-grid gap-2 small">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Modules enabled</span>
                  <span className="fw-semibold">{device?.modules.length ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="h6 mb-0">Modules</h2>
                <span className="badge text-bg-secondary">Demo preview</span>
              </div>
              {device?.modules.length ? (
                <div className="row g-3">
                  {device.modules.map((moduleName) => (
                    <div className="col-md-6" key={moduleName}>
                      <div className="border rounded-3 p-3 h-100 bg-body-tertiary">
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <div>
                            <h3 className="h6 mb-1">{formatModuleName(moduleName)}</h3>
                            <div className="text-secondary small">Quick access tools</div>
                          </div>
                          <span className="badge text-bg-info">Ready</span>
                        </div>
                        <div className="mt-3">
                          <ModuleComponentRenderer moduleName={moduleName} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-secondary">
                  No modules configured for this device yet. Add one to start tracking runs or equipment.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
