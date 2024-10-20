import { defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { LoadUser } from "types/loadTypes";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadUser> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);

    // data
    const roles: Roles = await rolesPromise;

    return {
        roles
    }
}
