import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import { apiUrl } from "helper/links";
import { checkAndParseGlobalsAsync } from "helper/parseJson";
import type { LoadAdmin } from "types/loadTypes";
import type { Globals, Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadAdmin> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    // data
    const roles: Roles = await rolesPromise;
    const globals: Globals = await checkAndParseGlobalsAsync(await globalsPromise);

    if (!roles.is_admin) {
        defaultNavigation(roles);
    }

    return {
        roles,
        globals,
    }
}
