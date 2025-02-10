import type {
    DashboardAllPendingTalks, DashboardAllTentativeOrAcceptedTalks, DashboardAllTimeSlots,
} from 'types/dashboardProvideTypes';


import { dashboardAllTentativeOrAcceptedTalkScheme, dashboardAllTimeSlotsScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';


type TentativeSlots = {
    [key: number]: DashboardAllTimeSlots
};

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
    const tentativeTalksFetchPromise = fetch(apiUrl(`/api/dashboard/admin/tentative-talks`));

    const tentativeTalksParsePromise = checkAndParseInputDataAsync(
        await tentativeTalksFetchPromise,
        dashboardAllTentativeOrAcceptedTalkScheme,
        'Serveranfrage für tentative or accepted Talks nicht erfolgreich.',
        'Unerwartete Daten für tentative or accepted Talks.',
    );

    return await tentativeTalksParsePromise;
}


export async function fetchTentativeSlots(
    fetch: typeof globalThis.fetch,
    tentativeTalks: DashboardAllTentativeOrAcceptedTalks,
): Promise<TentativeSlots> {
    const slots: TentativeSlots = {};

    for (const talk of tentativeTalks) {
        if (talk.event_id in slots) {
            continue;
        }

        const fetchPromise = fetch(apiUrl(`/api/dashboard/admin/time-slots/${talk.event_id}`));
        const parsePromise = checkAndParseInputDataAsync(
            await fetchPromise,
            dashboardAllTimeSlotsScheme,
            `Serveranfrage für timeslots für das event ${talk.event_id} nicht erfolgreich`,
            `Unerwartete Daten für timeslots für das event ${talk.event_id}`,
        );

        slots[talk.event_id] = await parsePromise;
    }

    return slots;
}
