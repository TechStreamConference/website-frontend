import type { DashboardAllEvents, DashboardEvent } from "types/dashboardProvideTypes";

import { error } from "@sveltejs/kit";
import type { SetAdminEvent } from "types/dashboardSetTypes";
import { isBeforeOrSameDatesString } from "helper/dates";
import { z } from "zod";

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
    const errorQueue: string[] = [];

    // name
    for (var event of allEvents) {
        if (event.id == data.id) { continue; }
        if (event.title.trim() === data.title.trim()) {
            errorQueue.push(`Event mit dem Titel ${data.title} existiert bereits.`)
        }
    }

    // text
    if (data.title.trim().length === 0) {
        errorQueue.push('Das Feld "Titel" muss angegeben werden.');
    }
    if (data.subtitle.trim().length === 0) {
        errorQueue.push('Das Feld "Untertitel" muss angegeben werden.');
    }
    if (data.description_headline.trim().length === 0) {
        errorQueue.push('Das Feld "Überschrift Beschreibung" muss angegeben werden.');
    }
    if (data.description.trim().length === 0) {
        errorQueue.push('Das Feld "Beschreibung" muss angegeben werden.');
    }

    // dates
    if (!isBeforeOrSameDatesString(data.start_date, data.end_date)) {
        errorQueue.push('Das Start-Datum liegt nach dem End-Datum.');
    }
    if (data.publish_date && data.schedule_visible_from) {
        if (!isBeforeOrSameDatesString(data.publish_date, data.schedule_visible_from)) {
            errorQueue.push('Der Ablaufplan ist vor dem Event sichtbar.');
        }
    }

    // url
    const urlScheme = z.string().url().nullable();
    if (!urlScheme.safeParse(data.discord_url).success) {
        errorQueue.push('Das Discord URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.presskit_url).success) {
        errorQueue.push('Das Presskit URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.twitch_url).success) {
        errorQueue.push('Das Twitch URL ist nicht valide.');
    }

    return errorQueue;
}
