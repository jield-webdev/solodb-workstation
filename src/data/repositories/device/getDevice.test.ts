import type { User } from "@jield/solodb-typescript-core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { canUserAccessDevice } from "./canUserAccessDevice.ts";
import { getDevice, setDeviceDataProvider } from "./getDevice.ts";

vi.mock("./canUserAccessDevice", () => ({
  canUserAccessDevice: vi.fn(),
}));

const canUserAccessDeviceMock = vi.mocked(canUserAccessDevice);

const userStub = {} as User;

describe("getDevice", () => {
  const getDeviceProviderMock = vi.fn();

  beforeEach(() => {
    canUserAccessDeviceMock.mockReset();
    getDeviceProviderMock.mockReset();
    setDeviceDataProvider({ getDevice: getDeviceProviderMock });
  });

  it("returns the provider response when access is allowed", async () => {
    const deviceId = 101;
    const deviceSummary = {
      id: deviceId,
      displayName: "Device 101",
      modules: new Set([1, 2, 3]),
    };

    canUserAccessDeviceMock.mockReturnValue(true);
    getDeviceProviderMock.mockResolvedValue(deviceSummary);

    const result = await getDevice(deviceId, userStub);

    expect(result).toEqual(deviceSummary);
    expect(canUserAccessDeviceMock).toHaveBeenCalledWith(deviceId, userStub);
    expect(getDeviceProviderMock).toHaveBeenCalledWith(deviceId, userStub);
  });

  it("throws when access is denied", async () => {
    const deviceId = 202;
    const deviceSummary = {
      id: deviceId,
      displayName: "Device 202",
      modules: new Set([4, 5]),
    };

    canUserAccessDeviceMock.mockReturnValue(false);
    getDeviceProviderMock.mockResolvedValue(deviceSummary);

    await expect(getDevice(deviceId, userStub)).rejects.toThrow(
      "User can not access the device",
    );
    expect(canUserAccessDeviceMock).toHaveBeenCalledWith(deviceId, userStub);
    expect(getDeviceProviderMock).not.toHaveBeenCalled();
  });
});
