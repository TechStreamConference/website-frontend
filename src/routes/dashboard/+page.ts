import { defaultNavigation } from "helper/dashboardNavigatin";
import { apiUrl } from "helper/links";
import { redirectIfUnauthorizedAsync } from "helper/loggedIn";
import { checkAndParseInputDataAsync } from "helper/parseJson";
import { rolesScheme, type Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<void> {
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

    defaultNavigation(roles);
}
