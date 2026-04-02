import type {Equipment, EquipmentModule, WorkstationComponent } from "@jield/solodb-typescript-core";
import { createContext } from "react";

export interface DeviceContext {
    deviceName: string;
    deviceId: number;
    equipment: Equipment | null;
    equipmentModule: EquipmentModule | null;
    WorkstationComponents: WorkstationComponent[] | null;
    isLoading: boolean;
}

export const DeviceContext = createContext<DeviceContext>({
    deviceName: "",
    deviceId: 0,
    equipment: null,
    equipmentModule: null,
    WorkstationComponents: null,
    isLoading: true,
});