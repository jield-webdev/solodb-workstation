import { getEquipment } from "@jield/solodb-typescript-core";
import type { DeviceContext } from "../context/DeviceContext.ts";

export default async function getDevice(
  deviceId: number,
): Promise<DeviceContext> {
  const equipment = await getEquipment({ id: deviceId });

  if (!equipment.id) {
    throw new Error(`Equipment not found for deviceId ${deviceId}`);
  }

  return {
    deviceName: equipment.name,
    deviceId: deviceId,
    equipment: equipment,
    equipmentModule: null,
    dashboardComponents: equipment.dashboard_components,
  };
}

