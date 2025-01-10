import type { LoadAdminTimeSlots } from 'types/dashboardLoadTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import {
    dashboardAllEventsScheme, dashboardAllTimeSlotsScheme, dashboardTalkDurationChoicesScheme,
} from 'types/dashboardProvideTypes';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminTimeSlots> {
    const allEventPromise     = fetch(apiUrl('/api/dashboard/admin/all-events'));
    const talkDurationPromise = fetch(apiUrl('/api/talk-duration-choices'));

    const allEvents           = await checkAndParseInputDataAsync(await allEventPromise,
                                                                  dashboardAllEventsScheme,
                                                                  `Serveranfrage für alle Events nicht erfolgreich. throw error(406)`,
                                                                  `Unerwartete Daten für alle Events. throw error(406)`,
    );
    const talkDurationChoices = await checkAndParseInputDataAsync(
        await talkDurationPromise,
        dashboardTalkDurationChoicesScheme,
        'not able to get talk duration choices',
        'unexpected data in talk duration choices',
    );

    if (allEvents.length === 0) {
        return {
            allEvents,
            currentSlots:   [],
            talkDurationChoices,
            currentEventID: 0,
        };
    }

    const id               = allEvents[0].id;
    const timeSlotsPromise = fetch(apiUrl(`/api/dashboard/admin/time-slots/${id}`));
    const timeSlots        = await checkAndParseInputDataAsync(
        await timeSlotsPromise,
        dashboardAllTimeSlotsScheme,
        `nicht möglich Time-Slots für Event ${id} abzufragen.`,
        `unerwartete daten für Time-Slots für das Event ${id}.`,
    );

    return {
        allEvents,
        currentSlots:   timeSlots,
        talkDurationChoices,
        currentEventID: id,
    };
}
