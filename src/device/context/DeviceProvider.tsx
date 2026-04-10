import { type ReactElement, useEffect, useState } from "react";
import { DeviceContext } from "./DeviceContext.ts";
import type {
  WorkstationComponent,
  Equipment,
  EquipmentModule,
} from "@jield/solodb-typescript-core";
import { useParams } from "react-router-dom";
import getDevice from "../helpers/getDevice.ts";

export const DeviceProvider = ({ children }: { children: ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

  const [deviceId, setDeviceId] = useState<number>(0);
  const [deviceName, setDeviceName] = useState<string>("");
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [equipmentModule, setEquipmentModule] =
    useState<EquipmentModule | null>(null);
  const [WorkstationComponents, setWorkstationComponents] = useState<
    WorkstationComponent[] | null
  >(null);

  useEffect(() => {
    getDevice(Number(id))
      .then((deviceContext) => {
        setDeviceId(deviceContext.deviceId);
        setDeviceName(deviceContext.deviceName);
        setEquipment(deviceContext.equipment);
        setEquipmentModule(deviceContext.equipmentModule);
        setWorkstationComponents(deviceContext.WorkstationComponents);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [id]);

  if (isError) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
        <div className="text-muted">Error loading device</div>
      </div>
    );
  }

  return (
    <DeviceContext.Provider
      value={{
        deviceName,
        deviceId,
        equipment,
        equipmentModule,
        WorkstationComponents,
        isLoading,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

