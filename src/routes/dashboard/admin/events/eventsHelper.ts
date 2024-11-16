import type { DashboardAllEvents, DashboardEvent } from "types/dashboardProvideTypes";

import { error } from "@sveltejs/kit";
import type { SetAdminEvent } from "types/dashboardSetTypes";
import { checkSQLTimeAndDate, convertTimeAndDateToSQL, isBeforeOrSameDatesString } from "helper/dates";
import { Schema, z } from "zod";

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

export function convertSaveData(data: SetAdminEvent): SetAdminEvent {
    const trimOrNull: Function = (entry: string): string | null => {
        if (entry.trim().length === 0) {
            return null;
        }
        return entry.trim();
    }
    const trim: Function = (entry: string): string => {
        return entry.trim();
    }

    return {
        id: data.id,
        title: trim(data.title),
        subtitle: trim(data.title),
        start_date: data.start_date,
        end_date: data.end_date,
        discord_url: trimOrNull(data.discord_url),
        twitch_url: trimOrNull(data.twitch_url),
        presskit_url: trimOrNull(data.presskit_url),
        trailer_youtube_id: trimOrNull(data.trailer_youtube_id),
        description_headline: trim(data.description_headline),
        description: trim(data.description),
        schedule_visible_from: checkSQLTimeAndDate(convertTimeAndDateToSQL(data.schedule_visible_from)),
        publish_date: checkSQLTimeAndDate(convertTimeAndDateToSQL(data.publish_date)),
    }
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
        errorQueue.push('Die Discord-URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.presskit_url).success) {
        errorQueue.push('Die Presskit-URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.twitch_url).success) {
        errorQueue.push('Die Twitch-URL ist nicht valide.');
    }

    return errorQueue;
}
