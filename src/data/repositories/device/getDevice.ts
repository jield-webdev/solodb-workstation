import type { User } from "@jield/solodb-typescript-core";
import { canUserAccessDevice } from "./canUserAccessDevice.ts";
import type { DeviceSummary } from "../../../types/device/deviceSummary.ts";
import devicesRegistryDev from "../../sources/json/devicesRegistryDev.json"

export type GetDevice = (
  deviceId: number,
  userCredentials: User,
) => Promise<DeviceSummary>;

type DeviceDataProvider = {
  getDevice: GetDevice;
};

// Default (production) provider
let provider: DeviceDataProvider = {
  getDevice: async (deviceId, _userCredentials) => {
    // real fetch from DB / API / file
    const device = devicesRegistryDev.find((device) => device.id == deviceId);
    if (!device) {
      throw new Error("Could not find device");
    }
    const returnDevice: DeviceSummary = {
      id: device.id,
      displayName: device.displayName,
      modules: device.modules,
    };

    return returnDevice;
  },
};

export function setDeviceDataProvider(next: DeviceDataProvider) {
  provider = next;
}

export async function getDevice(deviceId: number, user: User) {
  if (!canUserAccessDevice(deviceId, user)) {
  }

  return provider.getDevice(deviceId, user);
}
