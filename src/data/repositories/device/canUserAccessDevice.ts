import type { User } from "@jield/solodb-typescript-core";

export function canUserAccessDevice(_deviceId: number, _user: User): boolean {
    return true;
}
