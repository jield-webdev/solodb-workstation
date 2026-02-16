import type { User } from "@jield/solodb-typescript-core";

export function canUserAccessDevice(deviceId: number, user: User): boolean {
    void deviceId;
    void user;
    return true;
}
