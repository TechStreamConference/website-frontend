import type {LoadAdminCreatePanelDiscussion} from 'types/dashboardLoadTypes';

import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync} from 'helper/parseJson';
import {dashboardAllEventsScheme, dashboardTalkDurationChoicesScheme} from 'types/dashboardProvideTypes';
import {loadPossibleHosts} from './panelHelper';
import {allTalkTagScheme} from 'types/provideTypes';

export async function load({fetch}: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminCreatePanelDiscussion> {
    const eventsFetchPromise = fetch(apiUrl('/dashboard/admin/all-events'));
    const durationFetchPromise = fetch(apiUrl('/talk-duration-choices'));
    const tagsFetchPromise = fetch(apiUrl('/tags'));

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


    const durationParsePromise = checkAndParseInputDataAsync(
        await durationFetchPromise,
        dashboardTalkDurationChoicesScheme,
        'Serveranfrage für die Vortragslängen nicht erfolgreich.',
        'Unerwartete Daten für die Vortragslängen.',
    );
    const tagsParsePromise = checkAndParseInputDataAsync(
        await tagsFetchPromise,
        allTalkTagScheme,
        'Serveranfrage für die Tags nicht erfolgreich.',
        'Unerwartete Daten für die Tags.',
    );

    return {
        allEvents,
        possibleHosts: await possibleHostsPromise,
        durations: await durationParsePromise,
        tags: await tagsParsePromise,
    };
}
