import type { LoadAdminApprovalTalk } from 'types/dashboardLoadTypes';

import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllPendingTalkScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { getUserIds } from './approvalHelper';


export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminApprovalTalk> {
    const pendingTalksFetchPromise = fetch(apiUrl('/api/dashboard/admin/pending-talks'));

    const pendingTalksParsePromise = checkAndParseInputDataAsync(
        await pendingTalksFetchPromise,
        dashboardAllPendingTalkScheme,
        'Serveranfrage für pending Talks nicht erfolgreich.',
        'Unerwartete Daten für pending Talks.',
    );

    return {
        pendingTalks:   await pendingTalksParsePromise,
        tentativeTalks: [],
        userIDArray:    getUserIds(await pendingTalksParsePromise),
    };
}


// request feature: route for only admin all tentative talks

/*
 export async function load({ fetch }: {
 fetch: typeof globalThis.fetch
 }): Promise<LoadAdminApprovalTalk> {
 const allEventFetchPromise  = fetch(apiUrl('/api/dashboard/admin/all-events'));
 const allEventsParsePromise = checkAndParseInputDataAsync(
 await allEventFetchPromise,
 dashboardAllEventsScheme,
 'Serveranfrage für alle Event nicht erfolgreich',
 'Unerwartete Daten für alle Events',
 );

 const tentativeTalksFetchPromiseList = await (async () => {
 const list = [];
 for (const event of await allEventsParsePromise) {
 const promise = fetch(apiUrl(`/api/dashboard/admin/tentative-or-accepted-talks/${event.id}`));
 list.push(promise);
 }
 return list;
 })();
 const pendingTalksFetchPromise       = fetch(apiUrl('/api/dashboard/admin/pending-talks'));

 const tentativeTalksParsePromiseList = await (async () => {
 const list = [];
 for (const talkPromise of tentativeTalksFetchPromiseList) {
 const promise = checkAndParseInputDataAsync(
 await talkPromise,
 dashboardAllTentativeOrAcceptedTalkScheme,
 'Serveranfrage für tentative or accepted Talks nicht erfolgreich.',
 'Unerwartete Daten für tentative or accepted Talks.',
 );
 list.push(promise);
 }
 return list;
 })();
 const pendingTalksParsePromise       = checkAndParseInputDataAsync(
 await pendingTalksFetchPromise,
 dashboardAllPendingTalkScheme,
 'Serveranfrage für pending Talks nicht erfolgreich.',
 'Unerwartete Daten für pending Talks.',
 );

 const tentativeTalks                       = await (async () => {
 const list = [];
 for (const promise of tentativeTalksParsePromiseList) {
 list.push(...await promise);
 }
 return list.filter((entry) => entry.time_slot_accepted);
 })();

 return {
 pendingTalks:   await pendingTalksParsePromise,
 tentativeTalks: tentativeTalks,
 userIDArray:    getUserIds(await pendingTalksParsePromise, tentativeTalks),
 };
 }
 */
