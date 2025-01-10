import { type DashboardAllTimeSlots, dashboardAllTimeSlotsScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';

export async function getTimeSlotsAsync(fetch: typeof globalThis.fetch, id: number): Promise<DashboardAllTimeSlots> {
    const timeSlotsPromise = fetch(apiUrl(`/api/dashboard/admin/time-slots/${id}`));
    return checkAndParseInputDataAsync(
        await timeSlotsPromise,
        dashboardAllTimeSlotsScheme,
        `nicht möglich Time-Slots für Event ${id} abzufragen.`,
        `unerwartete daten für Time-Slots für das Event ${id}.`,
    );
}
