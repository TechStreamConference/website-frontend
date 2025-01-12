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
    const allEventPromise: Promise<Response> = fetch(apiUrl(`/api/dashboard/speaker/all-events`));
    const allTagsPromise                     = fetch(apiUrl(`/api/tags`));
    const allTalkDurationPromise             = fetch(apiUrl(`/api/talk-duration-choices`));

    const allEvent        = await checkAndParseInputDataAsync(await allEventPromise,
                                                              dashboardAllEventIDScheme,
                                                              `Serveranfrage für alle Event IDs nicht erfolgreich. throw error(406)`,
                                                              `Unerwartete Daten für alle Event Ids. throw error(406)`,
    );
    const allTags         = await checkAndParseInputDataAsync(await allTagsPromise,
                                                              allTalkTagScheme,
                                                              `Serveranfrage für alle Talk-Tags nicht erfolgreich; throw error (406)`,
                                                              `Unerwartete Daten für alle Talk-Tags; throw error(406)`,
    );
    const allTalkDuration = await checkAndParseInputDataAsync(
        await allTalkDurationPromise,
        dashboardTalkDurationChoicesScheme,
        `Serveranfrage für alle Talk-Längen nicht erfolgreich; throw error(406)`,
        `Unerwartete Daten für alle Talk-Längen; throw error(406)`,
    );

    if (allEvent.length === 0) {
        return {
            allEvent,
            allTalks:      [],
            currentTalk:   undefined,
            tags:          allTags,
            talkDurations: allTalkDuration,
        };
    }

    const eventID: number = allEvent[0].event_id;
    const allTalks        = await loadTalkFromEventIDAsync(fetch, eventID);
    const currentTalk     = allTalks.length > 0 ? new Clone(allTalks[0]) : undefined;

    return {
        allEvent,
        allTalks,
        currentTalk,
        tags:          allTags,
        talkDurations: allTalkDuration,
    };
}
