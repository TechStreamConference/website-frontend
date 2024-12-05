import type { LoadSpeakerTeamMemberEvent } from "types/dashboardLoadTypes";
import type { DashboardAllEventID, DashboardSpeakerTeamMember } from "types/dashboardProvideTypes";

import { dashboardAllEventIDScheme } from "types/dashboardProvideTypes";
import { error } from "@sveltejs/kit";
import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";
import { loadSpecificEvent } from "./loads";

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

    const event: DashboardSpeakerTeamMember = await loadSpecificEvent(fetch, current.event_id);

    return {
        allEvents,
        current,
        event,
    };
}
