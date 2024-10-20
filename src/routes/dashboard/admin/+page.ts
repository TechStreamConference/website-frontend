import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { LoadAdmin } from "types/loadTypes";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadAdmin> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);

    // data
    const roles: Roles = await rolesPromise;

    if (!roles.is_admin) {
        defaultNavigation(roles);
    }

    return {
        roles
    }
}
