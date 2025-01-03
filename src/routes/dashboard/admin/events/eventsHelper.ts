import {
    dashboardAllEventSpeakerScheme,
    type DashboardAllEvents,
    type DashboardAllEventSpeaker,
    type DashboardEvent,
} from 'types/dashboardProvideTypes';

import { error } from '@sveltejs/kit';
import type {
    SetAdminEvent,
    SetAllAdminEventSpeaker,
} from 'types/dashboardSetTypes';
import {
    checkSQLTimeAndDate,
    convertTimeAndDateToSQL,
    isBeforeOrSameDatesString,
} from 'helper/dates';
import { z } from 'zod';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';

function trimOrNull(entry: string): string | null {
    if (entry.trim().length === 0) {
        return null;
    }
    return entry.trim();
}

export function getAllEventTitle(events: DashboardAllEvents): string[] {
    const title: string[] = [];
    for (const event of events) {
        title.push(event.title);
    }
    return title;
}

export function getEventByTitle(events: DashboardAllEvents, title: string): DashboardEvent {
    for (const event of events) {
        if (event.title === title) {
            return event;
        }
    }

    console.error(`error while looking up event by title: ${title}`);
    throw error(500);
}

export function convertSaveEventData(data: DashboardEvent): SetAdminEvent {
    return {
        id:                    data.id,
        title:                 data.title.trim(),
        subtitle:              data.title.trim(),
        start_date:            data.start_date,
        end_date:              data.end_date,
        discord_url:           trimOrNull(data.discord_url),
        twitch_url:            trimOrNull(data.twitch_url),
        presskit_url:          trimOrNull(data.presskit_url),
        trailer_youtube_id:    trimOrNull(data.trailer_youtube_id),
        description_headline:  data.description_headline.trim(),
        description:           data.description.trim(),
        schedule_visible_from: checkSQLTimeAndDate(convertTimeAndDateToSQL(data.schedule_visible_from)),
        publish_date:          checkSQLTimeAndDate(convertTimeAndDateToSQL(data.publish_date)),
        call_for_papers_start: checkSQLTimeAndDate(convertTimeAndDateToSQL(data.call_for_papers_start)),
        call_for_papers_end:   checkSQLTimeAndDate(convertTimeAndDateToSQL(data.call_for_papers_end)),
    };
}

export function convertSaveSpeakerData(allSpeaker: DashboardAllEventSpeaker): SetAllAdminEventSpeaker {
    const result: SetAllAdminEventSpeaker = [];
    for (const speaker of allSpeaker) {
        result.push({
                        id:           speaker.id,
                        name:         speaker.name,
                        visible_from: checkSQLTimeAndDate(convertTimeAndDateToSQL(speaker.visible_from)),
                    });
    }
    return result;
}

export async function loadSpeaker(fetch: typeof globalThis.fetch, eventId: number): Promise<DashboardAllEventSpeaker> {
    const allSpeakerPromise = fetch(apiUrl(`/api/dashboard/admin/event/${eventId}/speaker`));

    return await checkAndParseInputDataAsync(
        await allSpeakerPromise,
        dashboardAllEventSpeakerScheme,
        `Serveranfrage für alle Speaker im event ${eventId} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Speaker im Event ${eventId}. throw error(406)`,
    );
}

export function validateData(
    data: SetAdminEvent,
    allSpeaker: SetAllAdminEventSpeaker,
    allEvents: DashboardAllEvents,
): string[] {
    const errorQueue: string[] = [];

    // name
    for (const event of allEvents) {
        if (event.id == data.id) {
            continue;
        }
        if (event.title.trim() === data.title.trim()) {
            errorQueue.push(`Event mit dem Titel ${data.title} existiert bereits.`);
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
    if (data.publish_date) {
        if (!isBeforeOrSameDatesString(data.publish_date, data.start_date)) {
            errorQueue.push('Das Event wird erst nach dem Event-Start veröffentlicht.');
        }
    }
    if (data.schedule_visible_from) {
        if (!isBeforeOrSameDatesString(data.schedule_visible_from, data.start_date)) {
            errorQueue.push('Der Ablaufplan ist erst nach dem Event-Start sichtbar.');
        }
    }

    if (data.call_for_papers_start && data.call_for_papers_end) {
        if (!isBeforeOrSameDatesString(data.call_for_papers_start, data.call_for_papers_end)) {
            errorQueue.push('Das Anmeldeende liegt vor dem Anmeldestart.');
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

    // speaker
    for (const speaker of allSpeaker) {
        if (speaker.visible_from) {
            if (!isBeforeOrSameDatesString(speaker.visible_from, data.start_date)) {
                errorQueue.push(`Speaker ${speaker.name} ist erst nach dem Event-Start sichtbar.`);
            }
        }
    }

    return errorQueue;
}
