import type { LoadAdminApproval } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync, parseProvidedJsonAsync } from 'helper/parseJson';
import {
    dashboardAllApprovalSocialMediaLinkScheme,
    dashboardAllApprovalSpeakerTeamMemberScheme,
} from 'types/dashboardProvideTypes';
import { z } from 'zod';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminApproval> {
    const speakerFetchPromise: Promise<Response>     = fetch(apiUrl('/api/dashboard/admin/approval/speaker'));
    const teamMemberFetchPromise: Promise<Response>  = fetch(apiUrl('/api/dashboard/admin/approval/team-member'));
    const socialMediaFetchPromise: Promise<Response> = fetch(apiUrl('/api/dashboard/admin/approval/social-media-link'));

    const speakerParsePromise     = checkAndParseInputDataAsync(
        await speakerFetchPromise,
        dashboardAllApprovalSpeakerTeamMemberScheme,
        `Serveranfrage für die Freigabedaten der Speaker nicht erfolgreich.`,
        `Unerwartete Daten für die Freigabedaten der Speaker.`,
    );
    const teamMemberParsePromise  = checkAndParseInputDataAsync(
        await teamMemberFetchPromise,
        dashboardAllApprovalSpeakerTeamMemberScheme,
        `Serveranfrage für die Freigabedaten der Team Member nicht erfolgreich.`,
        `Unerwartete Daten für die Freigabedaten der Team Member.`,
    );
    const socialMediaParsePromise = checkAndParseInputDataAsync(
        await socialMediaFetchPromise,
        dashboardAllApprovalSocialMediaLinkScheme,
        `Serveranfrage für die Freigabedaten der Social Media Link nicht erfolgreich.`,
        `Unerwartete Daten für die Freigabedaten der Social Media Link.`,
    );

    const speaker = await speakerParsePromise;

    const promises: Promise<Response>[] = [];
    for (const entry of speaker) {
        const promise = fetch(apiUrl(`/api/dashboard/admin/approval/user/${entry.user_id}/event/${entry.event_id}/can-reject`));
        promises.push(promise);
    }

    for (let i = 0; i < promises.length; ++i) {
        const response = await promises[i];
        if (!response.ok) {
            speaker[i].can_reject = false;
            continue;
        }

        const result          = await parseProvidedJsonAsync(response, z.object({
                                                                                    can_reject: z.boolean(),
                                                                                }));
        speaker[i].can_reject = result ? result.can_reject : false;
        // speaker[i].can_reject = true;
    }

    return {
        speaker,
        teamMember:  await teamMemberParsePromise,
        socialMedia: await socialMediaParsePromise,
    };
}
