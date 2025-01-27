import type { LoadAdminEvents } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllEventsScheme } from 'types/dashboardProvideTypes';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminEvents> {
    const allEventsFetchPromise = fetch(apiUrl('/api/dashboard/admin/all-events'));

    const allEventsParsePromise = checkAndParseInputDataAsync(
        await allEventsFetchPromise,
        dashboardAllEventsScheme,
        `Serveranfrage für alle Events nicht erfolgreich.`,
        `Unerwartete Daten für alle Events.`,
    );

    return {
        allEvents:  await allEventsParsePromise,
        allSpeaker: [], // will be filled inside the component
    };
}
