import type { DashboardAllEvents } from "types/dashboardProvideTypes";

export function getDropDownKeys(events: DashboardAllEvents): string[] {
    const keys: string[] = [];
    for (var event of events) {
        keys.push(event.title);
    }
    return keys;
}
