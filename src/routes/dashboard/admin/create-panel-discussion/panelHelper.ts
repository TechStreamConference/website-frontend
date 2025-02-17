import { type DashboardAllPersons, dashboardAllPersonsScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';

export async function loadPossibleHosts(fetch: typeof globalThis.fetch, eventId: number): Promise<DashboardAllPersons> {
    const possibleHostsFetchPromise = fetch(apiUrl(`/api/dashboard/admin/talk/possible-hosts/${eventId}`));

    const possibleHostsParsePromise = checkAndParseInputDataAsync(
        await possibleHostsFetchPromise,
        dashboardAllPersonsScheme,
        `Serveranfrage für possible hosts von event ID '${eventId} nicht erfolgreich.'`,
        `unerwartete Daten für possible hosts von event ID '${eventId}'.`,
    );

    return await possibleHostsParsePromise;
}
