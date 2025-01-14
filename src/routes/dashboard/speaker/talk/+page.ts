import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllEventIDScheme, dashboardTalkDurationChoicesScheme } from 'types/dashboardProvideTypes';
import { loadTalkFromEventIDAsync } from './talkHelper';
import { Clone } from 'helper/clone';
import { allTalkTagScheme } from 'types/provideTypes';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadSpeakerTalk> {
    const allEventsFetchPromise: Promise<Response> = fetch(apiUrl(`/api/dashboard/speaker/all-events`));
    const allTagsFetchPromise                      = fetch(apiUrl(`/api/tags`));
    const allTalkDurationFetchPromise              = fetch(apiUrl(`/api/talk-duration-choices`));

    const allTagsParsePromise         = checkAndParseInputDataAsync(await allTagsFetchPromise,
                                                                    allTalkTagScheme,
                                                                    `Serveranfrage für alle Talk-Tags nicht erfolgreich; throw error (406)`,
                                                                    `Unerwartete Daten für alle Talk-Tags; throw error(406)`,
    );
    const allTalkDurationParsePromise = checkAndParseInputDataAsync(
        await allTalkDurationFetchPromise,
        dashboardTalkDurationChoicesScheme,
        `Serveranfrage für alle Talk-Längen nicht erfolgreich; throw error(406)`,
        `Unerwartete Daten für alle Talk-Längen; throw error(406)`,
    );
    const allEvents                   = await checkAndParseInputDataAsync(
        await allEventsFetchPromise,
        dashboardAllEventIDScheme,
        `Serveranfrage für alle Event IDs nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Event Ids. throw error(406)`,
    );

    if (allEvents.length === 0) {
        return {
            allEvents,
            allTalks:      [],
            currentTalk:   undefined,
            tags:          await allTagsParsePromise,
            talkDurations: await allTalkDurationParsePromise,
        };
    }

    const eventID: number = allEvents[0].event_id;
    const allTalks        = await loadTalkFromEventIDAsync(fetch, eventID);
    const currentTalk     = allTalks.length > 0 ? new Clone(allTalks[0]) : undefined;

    return {
        allEvents,
        allTalks,
        currentTalk,
        tags:          await allTagsParsePromise,
        talkDurations: await allTalkDurationParsePromise,
    };
}
