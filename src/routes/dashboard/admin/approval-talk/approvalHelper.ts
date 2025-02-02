import type { DashboardAllPendingTalks } from 'types/dashboardProvideTypes';


export function getUserIds(pendingTalks: DashboardAllPendingTalks): number[] {

    // tentative talk are missing
    const ids = new Set<number>();

    pendingTalks.forEach(talk => ids.add(talk.speaker.user_id));

    return [...ids].sort((a, b) => a - b);
}
