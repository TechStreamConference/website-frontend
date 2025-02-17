import type { LoadAdminCreatePanelDiscussion } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllEventsScheme } from 'types/dashboardProvideTypes';
import { loadPossibleHosts } from './panelHelper';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminCreatePanelDiscussion> {
    const eventsFetchPromise = fetch(apiUrl('/api/dashboard/admin/all-events'));

    const eventsParsePromise = checkAndParseInputDataAsync(
        await eventsFetchPromise,
        dashboardAllEventsScheme,
        'Serveranfrage für alle Events nicht erfolgreich.',
        'Unerwartete Daten für alle Events',
    );

    const allEvents = await eventsParsePromise;

    const possibleHostsPromise = (async () => {
        if (allEvents.length === 0) {
            return [];
        }
        return loadPossibleHosts(fetch, allEvents[0].id);
    })();

    return {
        allEvents,
        possibleHosts: await possibleHostsPromise,
    };
}
