import type { DashboardAllTalk } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { dashboardAllTalkScheme } from 'types/dashboardProvideTypes';
import { checkAndParseInputDataAsync } from 'helper/parseJson';

export async function loadTalkFromEventIDAsync(fetch: typeof globalThis.fetch, eventID: number): Promise<DashboardAllTalk> {
    const allTalksPromise = fetch(apiUrl(`/api/dashboard/speaker/tentative-or-accepted-talks/${eventID}`));

    return await checkAndParseInputDataAsync(
        await allTalksPromise,
        dashboardAllTalkScheme,
        `Serveranfrage für Talks für Event ID ${eventID} nicht erfolgreich; throw (406)`,
        `Unerwartete Daten für Talks für Event ID ${eventID};  throw (406)`,
    );
}
