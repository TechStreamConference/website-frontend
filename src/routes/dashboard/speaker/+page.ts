import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { LoadSpeaker } from "types/loadTypes";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadSpeaker> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);

    // data
    const roles: Roles = await rolesPromise;

    if (!roles.is_speaker) {
        defaultNavigation(roles);
    }

    return {
        roles
    }
}
