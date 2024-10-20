import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<void> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);

    // data
    const roles = await rolesPromise;

    if (!roles.is_admin) {
        defaultNavigation(roles);
    }
}
