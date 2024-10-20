import { redirect } from "@sveltejs/kit";
import { rolesScheme, type Roles } from "types/provideTypes";
import { redirectIfUnauthorizedAsync } from "./loggedIn";
import { apiUrl } from "./links";
import { checkAndParseInputDataAsync } from "./parseJson";

export async function defaultPermissionCheck(fetch: Function): Promise<Roles> {
    // call
    const loggedInPromise: Promise<boolean> = redirectIfUnauthorizedAsync(fetch);
    const rolesPromise: Promise<Response> = fetch(apiUrl('/api/account/roles'));

    // data
    await loggedInPromise; // just to make sure the async function is fully executed
    const roles: Roles = await checkAndParseInputDataAsync<Roles>(
        await rolesPromise,
        rolesScheme,
        `Serveranfrage für roles nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für roles. throw error(404)`
    );

    return roles;
}

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
