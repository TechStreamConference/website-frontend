import type { DashboardAllPendingTalks, DashboardAllTentativeOrAcceptedTalks } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { dashboardAllPendingTalkScheme, dashboardAllTentativeOrAcceptedTalkScheme } from 'types/dashboardProvideTypes';
import { checkAndParseInputDataAsync } from 'helper/parseJson';

export async function loadTentativeOrAcceptedTalksFromEventIDAsync(
    fetch: typeof globalThis.fetch,
    eventID: number,
): Promise<DashboardAllTentativeOrAcceptedTalks> {
    const allTalksPromise = fetch(apiUrl(`/dashboard/speaker/tentative-or-accepted-talks/${eventID}`));

    return await checkAndParseInputDataAsync(
        await allTalksPromise,
        dashboardAllTentativeOrAcceptedTalkScheme,
        `Serveranfrage für tentative or accepted Talks für Event ID ${eventID} nicht erfolgreich; throw (406)`,
        `Unerwartete Daten für tentative or accepted Talks für Event ID ${eventID};  throw (406)`,
    );
}

export async function loadPendingTalksFromEventIDAsync(fetch: typeof globalThis.fetch): Promise<DashboardAllPendingTalks> {
    const allTalksPromise = fetch(apiUrl(`/dashboard/speaker/pending-talks`));

    return await checkAndParseInputDataAsync(
        await allTalksPromise,
        dashboardAllPendingTalkScheme,
        `Serveranfrage für pending Talks nicht erfolgreich; throw (406)`,
        `Unerwartete Daten für pending Talks; throw (406)`,
    );
}
