export interface DeviceSummary {
    // the id (must be unique) to identify the Device
    id: number; 
    displayName: string;

    // stores the DeviceModuleEntry id to check if its a available module for the device 
    modules: string[];
}
