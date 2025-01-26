import type { LoadUserSocials } from 'types/dashboardLoadTypes';
import type { DashboardAllSocialMediaLinks, DashboardAllSocialMediaLinkTypes } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardAllSocialMediaLinkScheme, dashboardAllSocialMediaLinkTypeScheme } from 'types/dashboardProvideTypes';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { SaveMessageType } from 'types/saveMessageType';
import { type SaveResult, trySaveDataAsync } from 'helper/trySaveDashboardData';
import { setUnsavedChanges } from 'stores/saved';

export type ValidateReturn = {
    data: DashboardAllSocialMediaLinks,
    messages: string[],
}

export type DeleteReturn = {
    data: DashboardAllSocialMediaLinks,
    result: SaveResult,
}

export async function loadDataAsync(fetch: typeof globalThis.fetch): Promise<LoadUserSocials> {
    const socialsFetchPromise    = fetch(apiUrl('/api/dashboard/user/social-media-link'));
    const socialTypeFetchPromise = fetch(apiUrl('/api/social-media-link-types'));

    const socialsParsePromise     = checkAndParseInputDataAsync(await socialsFetchPromise,
                                                                dashboardAllSocialMediaLinkScheme,
                                                                `Serveranfrage für alle Social Media Links nicht erfolgreich. throw error(406)`,
                                                                `Unerwartete Daten für alle Social Media Links. throw error(406)`,
    );
    const socialTypesParsePromise = checkAndParseInputDataAsync(
        await socialTypeFetchPromise,
        dashboardAllSocialMediaLinkTypeScheme,
        `Serveranfrage für alle Social Media Links Types nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für alle Social Media Links Types. throw error(406)`,
    );

    return {
        socials:     await socialsParsePromise,
        socialTypes: await socialTypesParsePromise,
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
    if (id === 0) {
        return {
            data,
            result: {
                success:  false,
                messages: [],
            },
        };
    }

    const result = await trySaveDataAsync([], `/api/dashboard/user/social-media-link/${id}`, 'DELETE');

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
