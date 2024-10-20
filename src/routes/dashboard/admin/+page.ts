import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import { apiUrl } from "helper/links";
import { checkAndParseGlobalsAsync, checkAndParseInputDataAsync } from "helper/parseJson";
import type { LoadAdmin } from "types/loadTypes";
import { adminScheme, type Admin, type Globals, type Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadAdmin> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));
    const adminPromise: Promise<Response> = fetch(apiUrl('/api/dashboard/admin'));

    // data
    const roles: Roles = await rolesPromise;
    const globals: Globals = await checkAndParseGlobalsAsync(await globalsPromise);
    const admin: Admin = await checkAndParseInputDataAsync<Admin>(
        await adminPromise,
        adminScheme,
        `Serveranfrage für admin data nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für admin data. throw error(404)`
    );

    if (!roles.is_admin) {
        defaultNavigation(roles);
    }

    return {
        roles,
        globals,
        admin,
    }
}
