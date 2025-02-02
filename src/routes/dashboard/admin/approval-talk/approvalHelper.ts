import type { DashboardAllPendingTalks, DashboardAllTentativeOrAcceptedTalks } from 'types/dashboardProvideTypes';

import { dashboardAllTentativeOrAcceptedTalkScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';


export function getUserIds(
    pendingTalks: DashboardAllPendingTalks,
    tentativeTalk: DashboardAllTentativeOrAcceptedTalks,
): number[] {
    const ids = new Set<number>();

    pendingTalks.forEach(talk => ids.add(talk.speaker.user_id));
    tentativeTalk.forEach(talk => ids.add(talk.speaker.user_id));

    return [...ids].sort((a, b) => a - b);
}

export async function fetchTentativeTalks(fetch: typeof globalThis.fetch): Promise<DashboardAllTentativeOrAcceptedTalks> {
    // TODO replace tentative talks fetch
    const tentativeTalksFetchPromise = fetch(apiUrl(`/api/dashboard/admin/tentative-or-accepted-talks/1`));

    const tentativeTalksParsePromise = checkAndParseInputDataAsync(
        await tentativeTalksFetchPromise,
        dashboardAllTentativeOrAcceptedTalkScheme,
        'Serveranfrage für tentative or accepted Talks nicht erfolgreich.',
        'Unerwartete Daten für tentative or accepted Talks.',
    );

    const test = (await tentativeTalksParsePromise).filter(x => !x.time_slot_accepted);
    console.log(test);
    return test;
}
