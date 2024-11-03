import type { LoadAdminGlobal } from "types/dashboardLoadTypes";
import type { AdminGlobal } from "types/dashboardProvideTypes";

import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";
import { adminGlobalScheme } from "types/dashboardProvideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadAdminGlobal> {
    // call
    const adminPromise: Promise<Response> = fetch(apiUrl('/api/dashboard/admin'));

    // data
    const admin: AdminGlobal = await checkAndParseInputDataAsync<AdminGlobal>(
        await adminPromise,
        adminGlobalScheme,
        `Serveranfrage für admin globals data nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für admin globals data. throw error(404)`
    );

    return {
        admin,
    }
}
