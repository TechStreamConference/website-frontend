import type { LoadAdminTimeSlots } from 'types/dashboardLoadTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import {
    dashboardAllEventsScheme, dashboardAllTimeSlotsScheme, dashboardTalkDurationChoicesScheme,
} from 'types/dashboardProvideTypes';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminTimeSlots> {
    const allEventFetchPromise     = fetch(apiUrl('/api/dashboard/admin/all-events'));
    const talkDurationFetchPromise = fetch(apiUrl('/api/talk-duration-choices'));

    const allEventsParsePromise           = checkAndParseInputDataAsync(await allEventFetchPromise,
                                                                        dashboardAllEventsScheme,
                                                                        `Serveranfrage für alle Events nicht erfolgreich. throw error(406)`,
                                                                        `Unerwartete Daten für alle Events. throw error(406)`,
    );
    const talkDurationChoicesParsePromise = checkAndParseInputDataAsync(
        await talkDurationFetchPromise,
        dashboardTalkDurationChoicesScheme,
        'not able to get talk duration choices',
        'unexpected data in talk duration choices',
    );

    const allEvents = await allEventsParsePromise;
    if (allEvents.length === 0) {
        return {
            allEvents,
            currentSlots:        [],
            talkDurationChoices: await talkDurationChoicesParsePromise,
            currentEventID:      0,
        };
    }

    const id                    = allEvents[0].id;
    const timeSlotsFetchPromise = fetch(apiUrl(`/api/dashboard/admin/time-slots/${id}`));
    const timeSlotsParsePromise = checkAndParseInputDataAsync(
        await timeSlotsFetchPromise,
        dashboardAllTimeSlotsScheme,
        `nicht möglich Time-Slots für Event ${id} abzufragen.`,
        `unerwartete daten für Time-Slots für das Event ${id}.`,
    );

    return {
        allEvents,
        currentSlots:        await timeSlotsParsePromise,
        talkDurationChoices: await talkDurationChoicesParsePromise,
        currentEventID:      id,
    };
}
