import { redirect } from "@sveltejs/kit";
import type { DashboardRoles } from "types/dashboardProvideTypes";
import { redirectIfUnauthorizedOrReturnRolesAsync } from "./loggedIn";
import * as MenuItems from "menu/menuItems";

export async function defaultPermissionCheck(fetch: Function): Promise<DashboardRoles> {
    const roles: DashboardRoles = await redirectIfUnauthorizedOrReturnRolesAsync(fetch);
    return roles;
}

export function defaultNavigation(roles: DashboardRoles): void {
    if (roles.is_admin) {
        throw redirect(302, '/dashboard/admin/globals');
    } else if (roles.is_team_member) {
        throw redirect(302, '/dashboard/team-member/event');
    } else if (roles.is_speaker) {
        throw redirect(302, '/dashboard/speaker/event');
    } else {
        throw redirect(302, '/dashboard/user/newsletter');
    }
}
