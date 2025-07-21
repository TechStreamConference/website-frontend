import type {DashboardAllTimeSlots} from 'types/dashboardProvideTypes';
import {dashboardAllTimeSlotsScheme} from 'types/dashboardProvideTypes';
import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync} from 'helper/parseJson';

export async function getTimeSlotsAsync(fetch: typeof globalThis.fetch, id: number): Promise<DashboardAllTimeSlots> {
    const timeSlotsPromise = fetch(apiUrl(`/dashboard/admin/time-slots/${id}`));
    return checkAndParseInputDataAsync(
        await timeSlotsPromise,
        dashboardAllTimeSlotsScheme,
        `nicht möglich Time-Slots für Event ${id} abzufragen.`,
        `unerwartete Daten für Time-Slots für das Event ${id}.`,
    );
}
