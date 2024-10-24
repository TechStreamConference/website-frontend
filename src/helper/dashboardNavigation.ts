import { redirect } from "@sveltejs/kit";
import { type Roles } from "types/provideTypes";
import { redirectIfUnauthorizedOrReteturnRolesAsync } from "./loggedIn";

export async function defaultPermissionCheck(fetch: Function): Promise<Roles> {
    const roles: Roles = await redirectIfUnauthorizedOrReteturnRolesAsync(fetch);

    return roles;
}

export function defaultNavigation(roles: Roles): void {
    if (roles.is_admin) {
        throw redirect(302, '/dashboard/admin/globals');
    } else if (roles.is_team_member) {
        throw redirect(302, '/dashboard/team-member/test');
    } else if (roles.is_speaker) {
        throw redirect(302, '/dashboard/speaker/test');
    } else {
        throw redirect(302, '/dashboard/user/test');
    }
}
