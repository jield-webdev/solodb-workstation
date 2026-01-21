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

  return (
    <div className="container py-4">
      <div>
        <h1 className="display-6 mb-1">
          {device?.displayName ?? "Loading device..."}
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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-lg">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="h6 mb-0">Modules</h2>
              </div>
              {device?.modules.length ? (
                <div className="row g-3">
                  {device.modules.map((moduleName) => (
                    <div key={moduleName} className="border rounded-3 p-3 h-100 bg-body-tertiary">
                      <ModuleComponentRenderer moduleName={moduleName} />
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
