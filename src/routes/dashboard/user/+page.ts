import { defaultPermissionCheck } from "helper/dashboardNavigatin";
import { apiUrl } from "helper/links";
import { checkAndParseGlobalsAsync } from "helper/parseJson";
import type { LoadUser } from "types/loadTypes";
import type { Globals, Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadUser> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);
    const globalsPromise: Promise<Response> = fetch(apiUrl('/api/globals'));

    // data
    const roles: Roles = await rolesPromise;
    const globals: Globals = await checkAndParseGlobalsAsync(await globalsPromise);

    return {
        roles,
        globals,
    }
}
