import type {Equipment, EquipmentModule, DashboardComponent } from "@jield/solodb-typescript-core";
import { createContext } from "react";

export interface DeviceContext {
    deviceName: string;
    deviceId: number;
    equipment: Equipment | null;
    equipmentModule: EquipmentModule | null;
    dashboardComponents: DashboardComponent[] | null;
}

export const DeviceContext = createContext<DeviceContext>({
    deviceName: "",
    deviceId: 0,
    equipment: null,
    equipmentModule: null,
    dashboardComponents: null,
});