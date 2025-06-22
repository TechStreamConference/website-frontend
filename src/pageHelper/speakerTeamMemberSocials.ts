import type { LoadUserSocials } from 'types/dashboardLoadTypes';
import type { DashboardAllSocialMediaLinks, DashboardAllSocialMediaLinkTypes } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllSocialMediaLinkScheme, dashboardAllSocialMediaLinkTypeScheme } from 'types/dashboardProvideTypes';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { type SaveResult, trySaveDataAsync } from 'helper/trySaveData';

export type ValidateReturn = {
    data: DashboardAllSocialMediaLinks,
    messages: string[],
}

export type DeleteReturn = {
    data: DashboardAllSocialMediaLinks,
    result: SaveResult,
}

export async function loadDataAsync(fetch: typeof globalThis.fetch): Promise<LoadUserSocials> {
    const socialsFetchPromise    = fetch(apiUrl('/dashboard/user/social-media-link'));
    const socialTypeFetchPromise = fetch(apiUrl('/social-media-link-types'));

    const socialsParsePromise     = checkAndParseInputDataAsync(await socialsFetchPromise,
                                                                dashboardAllSocialMediaLinkScheme,
                                                                `Serveranfrage für alle Social Media Links nicht erfolgreich.`,
                                                                `Unerwartete Daten für alle Social Media Links.`,
    );
    const socialTypesParsePromise = checkAndParseInputDataAsync(
        await socialTypeFetchPromise,
        dashboardAllSocialMediaLinkTypeScheme,
        `Serveranfrage für alle Social Media Links Types nicht erfolgreich.`,
        `Unerwartete Daten für alle Social Media Links Types.`,
    );

    return {
        socials:     await socialsParsePromise,
        socialTypes: await socialTypesParsePromise,
    };
}

export async function loadSocials(fetch: typeof globalThis.fetch): Promise<DashboardAllSocialMediaLinks> {
    const socialsPromise = fetch(apiUrl('/dashboard/user/social-media-link'));

    return await checkAndParseInputDataAsync(
        await socialsPromise,
        dashboardAllSocialMediaLinkScheme,
        `Serveranfrage für alle Social Media Links nicht erfolgreich.`,
        `Unerwartete Daten für alle Social Media Links.`,
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

export async function deleteLinkAsync(fetch: typeof globalThis.fetch, data: DashboardAllSocialMediaLinks, index: number): Promise<DeleteReturn> {
    const id = data[index].id;
    if (id === 0) {
        return {
            data,
            result: {
                success:  false,
                messages: [],
                infos:    {},
            },
        };
    }

    const result = await trySaveDataAsync(fetch, [], `/dashboard/user/social-media-link/${id}`, 'DELETE');

    if (!result.success) {
        return {
            data,
            result,
        };
    }

    data = data.filter((item) => item.id !== id);
    return {
        data,
        result,
    };
}
