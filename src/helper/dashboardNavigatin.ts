import { redirect } from "@sveltejs/kit";
import type { Roles } from "types/provideTypes";

export function defaultNavigation(roles: Roles): void {
    if (roles.is_admin) {
        throw redirect(302, '/dashboard/admin');
    } else if (roles.is_team_member) {
        throw redirect(302, '/dashboard/team-member');
    } else if (roles.is_speaker) {
        throw redirect(302, '/dashboard/speaker');
    } else {
        throw redirect(302, '/dashboard/user');
    }
}
