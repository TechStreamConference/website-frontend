import type { DashboardAllEventSpeaker, DashboardEvent } from 'types/dashboardProvideTypes';
import type { SetAdminEvent, SetAllAdminEventSpeaker } from 'types/dashboardSetTypes';

import { dashboardAllEventSpeakerScheme } from 'types/dashboardProvideTypes';
import {checkSQLTimeAndDate, convertTimeAndDateToSQL, isBeforeOrSameDatesString} from 'helper/dates';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import {z} from "zod";

function trimOrNull(entry: string): string | null {
    if (entry.trim().length === 0) {
        return null;
    }
    return entry.trim();
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
        trailer_url:           trimOrNull(data.trailer_url),
        trailer_poster_url:    trimOrNull(data.trailer_poster_url),
        description_headline:  data.description_headline.trim(),
        description:           data.description.trim(),
        schedule_visible_from: checkSQLTimeAndDate(convertTimeAndDateToSQL(data.schedule_visible_from)),
        publish_date:          checkSQLTimeAndDate(convertTimeAndDateToSQL(data.publish_date)),
        call_for_papers_start: checkSQLTimeAndDate(convertTimeAndDateToSQL(data.call_for_papers_start)),
        call_for_papers_end:   checkSQLTimeAndDate(convertTimeAndDateToSQL(data.call_for_papers_end)),
        frontpage_date:        checkSQLTimeAndDate(convertTimeAndDateToSQL(data.frontpage_date)),
    };
}

export function convertSaveSpeakerData(allSpeaker: DashboardAllEventSpeaker | undefined): SetAllAdminEventSpeaker {
    if (!allSpeaker) {
        return [];
    }

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

export function validateData(data: SetAdminEvent, allSpeaker: SetAllAdminEventSpeaker): string[] {
    const errorList: string[] = [];

    // text
    if (data.title.trim().length === 0) {
        errorList.push('Das Feld "Titel" muss angegeben werden.');
    }
    if (data.subtitle.trim().length === 0) {
        errorList.push('Das Feld "Untertitel" muss angegeben werden.');
    }
    if (data.description_headline.trim().length === 0) {
        errorList.push('Das Feld "Überschrift Beschreibung" muss angegeben werden.');
    }
    if (data.description.trim().length === 0) {
        errorList.push('Das Feld "Beschreibung" muss angegeben werden.');
    }

    // dates
    if (!isBeforeOrSameDatesString(data.start_date, data.end_date)) {
        errorList.push('Das Start-Datum liegt nach dem End-Datum.');
    }

    if (data.publish_date && data.schedule_visible_from) {
        if (!isBeforeOrSameDatesString(data.publish_date, data.schedule_visible_from)) {
            errorList.push('Der Ablaufplan ist vor dem Event sichtbar.');
        }
    }
    if (data.publish_date) {
        if (!isBeforeOrSameDatesString(data.publish_date, data.start_date)) {
            errorList.push('Das Event wird erst nach dem Event-Start veröffentlicht.');
        }
    }
    if (data.schedule_visible_from) {
        if (!isBeforeOrSameDatesString(data.schedule_visible_from, data.start_date)) {
            errorList.push('Der Ablaufplan ist erst nach dem Event-Start sichtbar.');
        }
    }

    if (data.call_for_papers_start && data.call_for_papers_end) {
        if (!isBeforeOrSameDatesString(data.call_for_papers_start, data.call_for_papers_end)) {
            errorList.push('Das Anmeldeende liegt vor dem Anmeldestart.');
        }
    }


    // url
    const urlScheme = z.string().url().nullable();
    if (!urlScheme.safeParse(data.discord_url).success) {
        errorList.push('Die Discord-URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.presskit_url).success) {
        errorList.push('Die Presskit-URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.twitch_url).success) {
        errorList.push('Die Twitch-URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.trailer_url).success) {
        errorList.push('Die Trailer-URL ist nicht valide.');
    }
    if (!urlScheme.safeParse(data.trailer_poster_url).success) {
        errorList.push('Die Trailer-Poster-URL ist nicht valide.');
    }

    // speaker
    for (const speaker of allSpeaker) {
        if (speaker.visible_from) {
            if (!isBeforeOrSameDatesString(speaker.visible_from, data.start_date)) {
                errorList.push(`Speaker ${speaker.name} ist erst nach dem Event-Start sichtbar.`);
            }
        }
    }

    return errorList;
}

export async function loadSpeaker(fetch: typeof globalThis.fetch, eventId: number): Promise<DashboardAllEventSpeaker> {
    if (eventId === 0) {
        return [];
    }

    const allSpeakerPromise = fetch(apiUrl(`/dashboard/admin/event/${eventId}/speaker`));

    return await checkAndParseInputDataAsync(
        await allSpeakerPromise,
        dashboardAllEventSpeakerScheme,
        `Serveranfrage für alle Speaker im event ${eventId} nicht erfolgreich.`,
        `Unerwartete Daten für alle Speaker im Event ${eventId}.`,
    );
}
