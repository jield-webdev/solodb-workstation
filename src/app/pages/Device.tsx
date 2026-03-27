import ModuleComponentRenderer from "../../modules/ModuleComponentRenderer";
import {useDevice} from "../../device/hooks/useDevice.ts";
import {ModuleStatusElement} from "@jield/solodb-react-components";

export default function Device() {
    const {deviceName, equipmentModule, WorkstationComponents} = useDevice();

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-start align-items-center gap-3">
                <h1 className="display-6 mb-2">{deviceName ?? "Loading device..."}</h1>
                {equipmentModule && <ModuleStatusElement module={equipmentModule}/>}
            </div>

            <div className="row">
                <div className="col-lg">
                    {WorkstationComponents?.length ? (
                        <div className="d-flex flex-column gap-3">
                            {WorkstationComponents.map((moduleName) => (
                                <div key={`${moduleName}:${deviceName}`} className="card shadow-sm">
                                    <div className="card-body">
                                        <ModuleComponentRenderer moduleName={moduleName.valueOf()}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card shadow-sm">
                            <div className="card-body text-secondary">
                                No modules configured for this device yet.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
