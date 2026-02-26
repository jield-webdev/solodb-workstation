import {
  getEquipment,
  getEquipmentModule,
} from "@jield/solodb-typescript-core";
import type { DeviceContext } from "../context/DeviceContext.ts";

export default async function getDevice(
  deviceId: number,
): Promise<DeviceContext> {
  const equipment = await getEquipment({ id: deviceId });

  if (!equipment.id) {
    throw new Error(`Equipment not found for deviceId ${deviceId}`);
  }

  let equipmentModule = await getEquipmentModule({
    id: equipment.main_tool_module_id ?? 0,
  });

  if (!equipment.id) {
    equipmentModule = null;
  }

  return {
    deviceName: equipment.name,
    deviceId: deviceId,
    equipment: equipment,
    equipmentModule: equipmentModule,
    WorkstationComponents: equipment.workstation_components,
  };
}
