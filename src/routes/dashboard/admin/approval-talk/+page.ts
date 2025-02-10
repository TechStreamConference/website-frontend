import type { LoadAdminApprovalTalk } from 'types/dashboardLoadTypes';

import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllPendingTalkScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { fetchTentativeSlots, fetchTentativeTalks, getUserIds } from './approvalHelper';


export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminApprovalTalk> {
    const tentativeTalksPromise    = fetchTentativeTalks(fetch);
    const pendingTalksFetchPromise = fetch(apiUrl('/api/dashboard/admin/pending-talks'));

    const pendingTalksParsePromise = checkAndParseInputDataAsync(
        await pendingTalksFetchPromise,
        dashboardAllPendingTalkScheme,
        'Serveranfrage für pending Talks nicht erfolgreich.',
        'Unerwartete Daten für pending Talks.',
    );

    const timeSlotsPromise = fetchTentativeSlots(fetch, await pendingTalksParsePromise, await tentativeTalksPromise);

    return {
        pendingTalks:   await pendingTalksParsePromise,
        tentativeTalks: await tentativeTalksPromise,
        userIDArray:    getUserIds(await pendingTalksParsePromise, await tentativeTalksPromise),
        slots:          await timeSlotsPromise,
    };
}
