import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";
import type { LoadAdmin } from "types/loadTypes";
import { adminScheme, type Admin, type Globals, type Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadAdmin> {
    // call
    const adminPromise: Promise<Response> = fetch(apiUrl('/api/dashboard/admin'));

    // data
    const admin: Admin = await checkAndParseInputDataAsync<Admin>(
        await adminPromise,
        adminScheme,
        `Serveranfrage für admin data nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für admin data. throw error(404)`
    );

    return {
        admin,
    }
}
