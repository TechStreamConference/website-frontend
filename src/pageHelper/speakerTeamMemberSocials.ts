import type { LoadUserSocials } from 'types/dashboardLoadTypes';
import type { DashboardAllSocialMediaLinks, DashboardAllSocialMediaLinkTypes } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllSocialMediaLinkScheme, dashboardAllSocialMediaLinkTypeScheme } from 'types/dashboardProvideTypes';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { SaveMessageType } from 'types/saveMessageType';

export type ValidateReturn = {
    data: DashboardAllSocialMediaLinks,
    messages: string[],
}

export type DeleteReturn = {
    data: DashboardAllSocialMediaLinks,
    message: SaveMessageType,
}

export async function loadDataAsync(fetch: typeof globalThis.fetch): Promise<LoadUserSocials> {
    const socialsPromise    = fetch(apiUrl('/api/dashboard/user/social-media-link'));
    const socialTypePromise = fetch(apiUrl('/api/social-media-link-types'));

    const socials     = await checkAndParseInputDataAsync(
        await socialsPromise,
        dashboardAllSocialMediaLinkScheme,
        `Serveranfrage für alle Social Media Links nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Social Media Links. throw error(406)`,
    );
    const socialTypes = await checkAndParseInputDataAsync(
        await socialTypePromise,
        dashboardAllSocialMediaLinkTypeScheme,
        `Serveranfrage für alle Social Media Links Types nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Social Media Links Types. throw error(406)`,
    );

    return {
        socials,
        socialTypes,
    };
}

export async function loadSocials(fetch: typeof globalThis.fetch): Promise<DashboardAllSocialMediaLinks> {
    const socialsPromise = fetch(apiUrl('/api/dashboard/user/social-media-link'));

    return await checkAndParseInputDataAsync(
        await socialsPromise,
        dashboardAllSocialMediaLinkScheme,
        `Serveranfrage für alle Social Media Links nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Social Media Links. throw error(406)`,
    );
}

export function getIDFromSocialMediaType(types: DashboardAllSocialMediaLinkTypes, type: string): number {
    for (const element of types) {
        if (type === element.name) {
            return element.id;
        }
    }
    console.error(`not able to look up requested social media link type ID: ${type}`);
    throw error(500);
}


export function validate(data: DashboardAllSocialMediaLinks): ValidateReturn {
    const https: string      = 'https://';
    const http: string       = 'http://';
    const messages: string[] = [];
    for (const entry of data) {
        entry.url = entry.url.trim();
        if (entry.url.length === 0) {
            messages.push(`Ein ${entry.name} - Eintrag ist leer`);
            continue;
        }

        if (!entry.url.startsWith(https) && !entry.url.startsWith(http)) {
            entry.url = https + entry.url;
        }

        const validated = z.string().url().safeParse(entry.url);
        if (!validated.success) {
            messages.push(`${entry.url} ist keine valide URL.`);
            continue; // keep this continue here to prevent bugs when one adds code after this.
        }
    }

    return {
        data,
        messages,
    };
}

export async function deleteLinkAsync(data: DashboardAllSocialMediaLinks, index: number): Promise<DeleteReturn> {
    const id = data[index].id;
    if (id !== 0) {
        const deleteResponse: Response = await fetch(
            apiUrl(`/api/dashboard/user/social-media-link/${id}`),
            { method: 'DELETE' },
        );
        if (!deleteResponse.ok) {
            console.error(`Deleting Link: Bad Backend response: ${deleteResponse.status}`);
            return {
                data,
                message: SaveMessageType.DeleteError,
            };
        }
    }

    data = data.filter((item) => item.id !== id);
    return {
        data,
        message: SaveMessageType.Delete,
    };
}
