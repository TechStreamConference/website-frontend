import type {DashboardAllPersons, DashboardAllTentativeOrAcceptedTalks} from 'types/dashboardProvideTypes';

import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync} from 'helper/parseJson';
import {dashboardAllPersonsScheme, dashboardAllTentativeOrAcceptedTalkScheme} from 'types/dashboardProvideTypes';

export async function loadTalksOfEvent(
    fetch: typeof globalThis.fetch,
    id: number,
): Promise<DashboardAllTentativeOrAcceptedTalks> {
    const talkFetchPromise = fetch(apiUrl(`/dashboard/admin/tentative-or-accepted-talks/${id}`));

    const talkParsePromise = checkAndParseInputDataAsync(
        await talkFetchPromise,
        dashboardAllTentativeOrAcceptedTalkScheme,
        `Serveranfrage für die Talks für event id '${id}' nicht erfolgreich.`,
        `Unerwartete Daten für die Talks für event id '${id}'`,
    );

    return await talkParsePromise;
}

export async function loadPossibleGuestsOfTalk(
    fetch: typeof globalThis.fetch,
    id: number,
): Promise<DashboardAllPersons> {
    const possibleGuestsFetchPromise = fetch(apiUrl(`/dashboard/admin/talk/${id}/possible-guests`));

    const possibleGuestsParsePromise = checkAndParseInputDataAsync(
        await possibleGuestsFetchPromise,
        dashboardAllPersonsScheme,
        `Serveranfrage für die möglichen Gäste für talk id '${id}' nicht erfolgreich.`,
        `Unerwartete Daten für die möglichen Gäste für talk id '${id}'`,
    );

    return await possibleGuestsParsePromise;
}
