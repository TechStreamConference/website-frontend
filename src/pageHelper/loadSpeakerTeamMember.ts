import type {
    DashboardAllEventID, DashboardSpeakerTeamMember,
} from 'types/dashboardProvideTypes';
import type { LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';

import {
    dashboardAllEventIDScheme, dashboardSpeakerTeamMemberScheme,
} from 'types/dashboardProvideTypes';
import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { error } from '@sveltejs/kit';


export async function loadDataAsync(
    fetch: typeof globalThis.fetch,
    type: 'speaker' | 'team-member',
): Promise<LoadSpeakerTeamMemberEvent> {
    const allEventResponse: Promise<Response> = fetch(apiUrl(`/api/dashboard/${type}/all-events`));
    const allEvents                           = await checkAndParseInputDataAsync<DashboardAllEventID>(
        await allEventResponse,
        dashboardAllEventIDScheme,
        `Serveranfrage für alle Event IDs im ${type} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Event Ids der ${type}. throw error(406)`,
    );

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
    const eventResponse: Promise<Response> = fetch(apiUrl(`/api/dashboard/${type}/event/${eventID}`));
    return await checkAndParseInputDataAsync<DashboardSpeakerTeamMember>(
        await eventResponse,
        dashboardSpeakerTeamMemberScheme,
        `Serveranfrage für den ${type}-Eintrag für Event ${eventID} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für den ${type}-Eintrag für das Event ${eventID}. throw error(406)`,
    );
}
