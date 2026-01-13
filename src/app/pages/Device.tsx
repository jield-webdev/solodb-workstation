import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { useParams } from "react-router-dom";
import type { DeviceSummary } from "../../types/device/deviceSummary";
import { getDevice } from "../../data/repositories/device/getDevice";

export default function Device() {
  const { user } = useAuth();
  const { id } = useParams();

  const [device, setDevice] = useState<DeviceSummary>();

  useEffect(() => {
    if (!user || !id) return;
    getDevice(Number(id), user).then(setDevice);
  }, [user, id]);

  return (
    <div>
      <div> {user?.full_name}</div>
      <div> Device: {device?.displayName}</div>
      <div>
        Modules:
        {device?.modules.map((mod) => (
          <span key={mod}>{mod} </span>
        ))}
      </div>
    </div>
  );
}
