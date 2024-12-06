import type { LoadUserSocials } from "types/dashboardLoadTypes";
import type { DashboardAllSocialMediaLink } from "types/dashboardProvideTypes";

import { apiUrl } from "helper/links";
import { checkAndParseInputDataAsync } from "helper/parseJson";
import { dashboardAllSocialMediaLinkScheme } from "types/dashboardProvideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<LoadUserSocials> {
    const socialsPromise = fetch(apiUrl("/api/dashboard/user/social-media-link"));

    const socials = await checkAndParseInputDataAsync<DashboardAllSocialMediaLink>(
        await socialsPromise,
        dashboardAllSocialMediaLinkScheme,
        `Serveranfrage für alle Social Media Links nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Social Media Links. throw error(406)`
    )

    return {
        socials,
    }
}
