import type { DashboardSpeakerTeamMember } from 'types/dashboardProvideTypes';
import type { LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';
import type { SetSpeakerTeamMemberEvent } from 'types/dashboardSetTypes';

import { dashboardAllEventIDScheme, dashboardSpeakerTeamMemberScheme } from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { error } from '@sveltejs/kit';


export type NewImage = {
    lastPhotoX: number;
    lastPhotoY: number;
    lastPhotoSize: number;
    imageFile: File | undefined;
}

export type ValidateReturn = {
    data: SetSpeakerTeamMemberEvent,
    messages: string[],
}

export async function loadDataAsync(
    fetch: typeof globalThis.fetch,
    type: 'speaker' | 'team-member',
): Promise<LoadSpeakerTeamMemberEvent> {
    const allEventFetchPromise: Promise<Response> = fetch(apiUrl(`/api/dashboard/${type}/all-events`));
    const allEventsParsePromise                   = checkAndParseInputDataAsync(
        await allEventFetchPromise,
        dashboardAllEventIDScheme,
        `Serveranfrage für alle Event IDs im ${type} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Event Ids der ${type}. throw error(406)`,
    );

    const allEvents = await allEventsParsePromise;
    if (allEvents.length == 0) {
        console.error('Keine Events nach dem Laden von allen Events vorhanden.');
        throw error(406);
    }
    const current = allEvents[allEvents.length - 1];

    const event: DashboardSpeakerTeamMember = await loadSpeakerTeamMemberAsync(fetch, current.event_id, type);

    return {
        allEvents,
        current,
        event,
    };
}

export async function loadSpeakerTeamMemberAsync(
    fetch: typeof globalThis.fetch,
    eventID: number,
    type: string,
): Promise<DashboardSpeakerTeamMember> {
    const eventPromise: Promise<Response> = fetch(apiUrl(`/api/dashboard/${type}/event/${eventID}`));
    return await checkAndParseInputDataAsync(
        await eventPromise,
        dashboardSpeakerTeamMemberScheme,
        `Serveranfrage für den ${type}-Eintrag für Event ${eventID} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für den ${type}-Eintrag für das Event ${eventID}. throw error(406)`,
    );
}

export function validate(data: SetSpeakerTeamMemberEvent): ValidateReturn {
    const messages: string[] = [];

    const fields: string[] = [
        data.name,
        data.short_bio,
        data.bio,
    ];
    const errors: string[] = [
        'Der Name darf nicht leer sein.',
        'Die Kurzbeschreibung darf nicht leer sein.',
        'Die Beschreibung darf nicht leer sein.',
    ];

    for (let i = 0; i < fields.length; ++i) {
        if (fields[i].trim().length === 0) {
            messages.push(errors[i]);
        }
    }

    return {
        data,
        messages,
    };
}
