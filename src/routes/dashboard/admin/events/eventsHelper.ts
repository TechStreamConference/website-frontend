import type { DashboardAllEventSpeaker, DashboardEvent } from 'types/dashboardProvideTypes';
import type { SetAdminEvent, SetAllAdminEventSpeaker } from 'types/dashboardSetTypes';

import { dashboardAllEventSpeakerScheme } from 'types/dashboardProvideTypes';
import { checkSQLTimeAndDate, convertTimeAndDateToSQL } from 'helper/dates';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';

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
