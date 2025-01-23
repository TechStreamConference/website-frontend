import type { LoadAdminApproval } from 'types/dashboardLoadTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import {
    dashboardAllApprovalSocialMediaLinkScheme, dashboardAllApprovalSpeakerTeamMemberScheme,
} from 'types/dashboardProvideTypes';


export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadAdminApproval> {
    const speakerFetchPromise: Promise<Response>     = fetch(apiUrl('/api/dashboard/admin/approval/speaker'));
    const teamMemberFetchPromise: Promise<Response>  = fetch(apiUrl('/api/dashboard/admin/approval/team-member'));
    const socialMediaFetchPromise: Promise<Response> = fetch(apiUrl('/api/dashboard/admin/approval/social-media-link'));


    const speakerParsePromise     = checkAndParseInputDataAsync(
        await speakerFetchPromise,
        dashboardAllApprovalSpeakerTeamMemberScheme,
        `Serveranfrage für die Freigabedaten der Speaker nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für die Freigabedaten der Speaker. throw error(406)`,
    );
    const teamMemberParsePromise  = checkAndParseInputDataAsync(
        await teamMemberFetchPromise,
        dashboardAllApprovalSpeakerTeamMemberScheme,
        `Serveranfrage für die Freigabedaten der Team Member nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für die Freigabedaten der Team Member. throw error(406)`,
    );
    const socialMediaParsePromise = checkAndParseInputDataAsync(
        await socialMediaFetchPromise,
        dashboardAllApprovalSocialMediaLinkScheme,
        `Serveranfrage für die Freigabedaten der Social Media Link nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für die Freigabedaten der Social Media Link. throw error(406)`,
    );

    return {
        speaker:     await speakerParsePromise,
        teamMember:  await teamMemberParsePromise,
        socialMedia: await socialMediaParsePromise,
    };
}
