import type { LoadAdminGuests } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllEventsScheme } from 'types/dashboardProvideTypes';
import { loadPossibleGuestsOfTalk, loadTalksOfEvent } from './guests-helper';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminGuests> {
    const allEventsFetchPromise = fetch(apiUrl('/dashboard/admin/all-events'));

    const allEventsParsePromise = checkAndParseInputDataAsync(
        await allEventsFetchPromise,
        dashboardAllEventsScheme,
        'Serveranfrage für alle Events nicht erfolgreich.',
        'Unerwartete Daten für alle Events.',
    );

    const allEvents = await allEventsParsePromise;

    const talksPromise = (async () => {
        if (allEvents.length === 0) {
            return [];
        }
        return loadTalksOfEvent(fetch, allEvents[0].id);
    })();

    const talksOfEvent = await talksPromise;

    const possibleGuestsOfEvent = (async () => {
        if (talksOfEvent.length === 0) {
            return [];
        }
        return loadPossibleGuestsOfTalk(fetch, talksOfEvent[0].id);
    })();

    return {
        allEvents,
        talksOfEvent,
        guestsOfTalk: await possibleGuestsOfEvent,
    };
}
