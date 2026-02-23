import ModuleComponentRenderer from "../../modules/ModuleComponentRenderer";
import { useDevice } from "../../device/hooks/useDevice.ts";
import { ModuleStatusElement } from "@jield/solodb-react-components";

export default function Device() {
  const { deviceName, equipmentModule, dashboardComponents } = useDevice();

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-start">
        <h1 className="display-6 mb-2">{deviceName ?? "Loading device..."}</h1>
        {equipmentModule && <ModuleStatusElement module={equipmentModule} />}
      </div>

      <div className="row">
        <div className="col-lg">
          <div className="card shadow-sm">
            <div className="card-body">
              {dashboardComponents?.length ? (
                <div className="row g-3">
                  {dashboardComponents.map((moduleName) => (
                    <ModuleComponentRenderer
                      key={`${moduleName}:${deviceName}`}
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
