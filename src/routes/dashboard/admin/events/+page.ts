import type { LoadAdminEvents } from "types/dashboardLoadTypes";
import type { DashboardAllEvents } from "types/dashboardProvideTypes";

import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";
import { dashboardAllEventsScheme } from "types/dashboardProvideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadAdminEvents> {
    const allEventsPromise = fetch(apiUrl("/api/dashboard/admin/all-events"));

    const allEvents = await checkAndParseInputDataAsync<DashboardAllEvents>(
        await allEventsPromise,
        dashboardAllEventsScheme,
        `Serveranfrage für alle Events nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für alle Events. throw error(404)`
    )

    return {
        allEvents,
    }
}
