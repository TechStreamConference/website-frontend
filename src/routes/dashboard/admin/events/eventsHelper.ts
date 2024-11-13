import type { DashboardAllEvents, DashboardEvent } from "types/dashboardProvideTypes";

import { error } from "@sveltejs/kit";
import type { SetAdminEvent } from "types/dashboardSetTypes";

export function getAllEventTitle(events: DashboardAllEvents): string[] {
    const title: string[] = [];
    for (var event of events) {
        title.push(event.title);
    }
    return title;
}

export function getEventByTitle(events: DashboardAllEvents, title: string): DashboardEvent {
    for (var event of events) {
        if (event.title === title) {
            return event;
        }
    }

    console.error(`error while looking up event by title: ${title}`);
    throw error(500);
}



export function validateData(data: SetAdminEvent, allEvents: DashboardAllEvents): string[] {
    const errorQue: string[] = [];
    for (var event of allEvents) {

        if (event.id == data.id) { continue; }

        if (event.title.trim() === data.title.trim()) {
            errorQue.push(`Event mit dem Titel ${data.title} existiert bereits.`)
        }
    }
    return errorQue;
}
