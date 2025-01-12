import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllEventIDScheme } from 'types/dashboardProvideTypes';
import { loadTalkFromEventIDAsync } from './talkHelper';
import { Clone } from 'helper/clone';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadSpeakerTalk> {
    const allEventPromise: Promise<Response> = fetch(apiUrl(`/api/dashboard/speaker/all-events`));

    const allEvent = await checkAndParseInputDataAsync(
        await allEventPromise,
        dashboardAllEventIDScheme,
        `Serveranfrage für alle Event IDs nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Event Ids. throw error(406)`,
    );

    if (allEvent.length === 0) {
        return {
            allEvent,
            allTalks:    [],
            currentTalk: undefined,
        };
    }

    const eventID: number = allEvent[0].event_id;
    const allTalks        = await loadTalkFromEventIDAsync(fetch, eventID);
    const currentTalk     = allTalks.length > 0 ? new Clone(allTalks[0]) : undefined;

    return {
        allEvent,
        allTalks,
        currentTalk,
    };
}
