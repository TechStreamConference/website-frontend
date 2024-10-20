import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { LoadTeamMember } from "types/loadTypes";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadTeamMember> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);

    // data
    const roles: Roles = await rolesPromise;

    if (!roles.is_team_member) {
        defaultNavigation(roles);
    }

    return {
        roles
    }
}
