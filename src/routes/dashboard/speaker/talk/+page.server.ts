import type {LoadSpeakerTalk} from 'types/dashboardLoadTypes';

import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync} from 'helper/parseJson';
import {dashboardAllEventIDScheme, dashboardTalkDurationChoicesScheme} from 'types/dashboardProvideTypes';
import {loadPendingTalksFromEventIDAsync, loadTentativeOrAcceptedTalksFromEventIDAsync} from './talkHelper';
import {allTalkTagScheme} from 'types/provideTypes';

export async function load({fetch}: {
    fetch: typeof globalThis.fetch
}): Promise<LoadSpeakerTalk> {
    const allEventsFetchPromise = fetch(apiUrl(`/dashboard/speaker/all-events`));
    const allTagsFetchPromise = fetch(apiUrl(`/tags`));
    const allTalkDurationFetchPromise = fetch(apiUrl(`/talk-duration-choices`));

    const allEventsParsePromise = checkAndParseInputDataAsync(await allEventsFetchPromise,
        dashboardAllEventIDScheme,
        `Serveranfrage für alle Event IDs nicht erfolgreich.`,
        `Unerwartete Daten für alle Event Ids.`,
    );
    const allTagsParsePromise = checkAndParseInputDataAsync(await allTagsFetchPromise,
        allTalkTagScheme,
        `Serveranfrage für alle Talk-Tags ist nicht erfolgreich;`,
        `Unerwartete Daten für alle Talk-Tags;`,
    );
    const allTalkDurationParsePromise = checkAndParseInputDataAsync(
        await allTalkDurationFetchPromise,
        dashboardTalkDurationChoicesScheme,
        `Serveranfrage für alle Talk-Längen nicht erfolgreich;`,
        `Unerwartete Daten für alle Talk-Längen;`,
    );

    const allEvents = await allEventsParsePromise;
    if (allEvents.length === 0) {
        return {
            allEvents,
            tentativeOrAcceptedTalks: [],
            pendingTalks: [],
            tags: await allTagsParsePromise,
            talkDurations: await allTalkDurationParsePromise,
        };
    }

    const eventID: number = allEvents[0].event_id;
    const AllTentativeOrAcceptedTalksPromise = loadTentativeOrAcceptedTalksFromEventIDAsync(fetch, eventID);
    const AllPendingTalksPromise = loadPendingTalksFromEventIDAsync(fetch);
    return {
        allEvents,
        tentativeOrAcceptedTalks: await AllTentativeOrAcceptedTalksPromise,
        pendingTalks: await AllPendingTalksPromise,
        tags: await allTagsParsePromise,
        talkDurations: await allTalkDurationParsePromise,
    };
}
