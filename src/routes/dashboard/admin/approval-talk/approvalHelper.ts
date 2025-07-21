import type {
    DashboardAllPendingTalks, DashboardAllTentativeOrAcceptedTalks, DashboardAllTimeSlots,
} from 'types/dashboardProvideTypes';


import {dashboardAllTentativeOrAcceptedTalkScheme, dashboardAllTimeSlotsScheme} from 'types/dashboardProvideTypes';
import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync} from 'helper/parseJson';


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
    const tentativeTalksFetchPromise = fetch(apiUrl(`/dashboard/admin/tentative-talks`));

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
    pendingTalks: DashboardAllPendingTalks,
    tentativeTalks: DashboardAllTentativeOrAcceptedTalks,
): Promise<TentativeSlots> {
    const slots: TentativeSlots = {};
    const fetchSlots = async <T extends {
        event_id: number,
    }>(talks: T[]) => {
        for (const talk of talks) {
            if (talk.event_id in slots) {
                continue;
            }

            const fetchPromise = fetch(apiUrl(`/dashboard/admin/time-slots/${talk.event_id}`));
            const parsePromise = checkAndParseInputDataAsync(
                await fetchPromise,
                dashboardAllTimeSlotsScheme,
                `Serveranfrage für timeslots für das event ${talk.event_id} nicht erfolgreich`,
                `Unerwartete Daten für timeslots für das event ${talk.event_id}`,
            );

            slots[talk.event_id] = await parsePromise;
        }
    };

    await fetchSlots(tentativeTalks);
    await fetchSlots(pendingTalks);

    return slots;
}
