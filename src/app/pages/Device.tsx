import ModuleComponentRenderer from "../../modules/ModuleComponentRenderer";
import {useDevice} from "../../device/hooks/useDevice.ts";

export default function Device() {
    const {deviceId, deviceName, equipment, equipmentModule, dashboardComponents} = useDevice();

  return (
    <div className="container-fluid py-4">
      <div>
        <h1 className="display-6 mb-1">
          {deviceName ?? "Loading device..."}
        </h1>
      </div>

      <div className="row">
        <div className="col-lg">
          <div className="card shadow-sm">
            <div className="card-body">
              {equipment?.dashboard_components.length ? (
                <div className="row g-3">
                  {equipment.dashboard_components.map((moduleName) => (
                    <ModuleComponentRenderer
                      moduleName={moduleName.valueOf()}
                    />
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
