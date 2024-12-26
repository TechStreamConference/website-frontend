import { redirect } from '@sveltejs/kit';
import type { DashboardRoles } from 'types/dashboardProvideTypes';
import { redirectIfUnauthorizedOrReturnRolesAsync } from './loggedIn';
import * as MenuItems from 'menu/menuItems';

export async function defaultPermissionCheck(fetch: typeof globalThis.fetch): Promise<DashboardRoles> {
    return await redirectIfUnauthorizedOrReturnRolesAsync(fetch);
}

export function defaultNavigation(roles: DashboardRoles): void {
    if (roles.is_admin) {
        throw redirect(302, MenuItems.admin.url);
    } else if (roles.is_team_member) {
        throw redirect(302, MenuItems.teamMember.url);
    } else if (roles.is_speaker) {
        throw redirect(302, MenuItems.speaker.url);
    } else {
        throw redirect(302, MenuItems.user.url);
    }
}
