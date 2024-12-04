import type { LoadSpeakerTeamMemberEvent } from "types/dashboardLoadTypes";
import type { DashboardAllEventID, DashboardAllSpeakerTeamMember } from "types/dashboardProvideTypes";

import { dashboardAllEventIDScheme, dashboardAllSpeakerTeamMemberScheme } from "types/dashboardProvideTypes";
import { error } from "@sveltejs/kit";
import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadSpeakerTeamMemberEvent> {
    const allEventResponse: Promise<Response> = fetch(apiUrl('/api/dashboard/speaker/all-events'));
    const allEvents = await checkAndParseInputDataAsync<DashboardAllEventID>(
        await allEventResponse,
        dashboardAllEventIDScheme,
        `Serveranfrage für alle Event IDs im Speaker nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für Alle Event Ids der Speaker. throw error(406)`
    )

    if (allEvents.length == 0) {
        console.error("Keine Events nach dem Laden von allen Events vorhanden.")
        throw error(406);
    }
    const current = allEvents[allEvents.length - 1];

    const eventResponse: Promise<Response> = fetch(apiUrl(`/api/dashboard/speaker/event/${current.event_id}`));
    const event = await checkAndParseInputDataAsync<DashboardAllSpeakerTeamMember>(
        await eventResponse,
        dashboardAllSpeakerTeamMemberScheme,
        `Serveranfrage für den Speaker-Eintrag für Event ${current.event_id} nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für den Speaker-Eintrag für das Event ${current.event_id}. throw error(406)`
    )
    if (event.length != 1) {
        console.error(`Empfangene Speaker Datensätze: ${event.length} | erwartete Speaker Datensätze: 1`)
        throw error(406);
    }

    return {
        allEvents,
        current,
        event: event[0],
    };
}
