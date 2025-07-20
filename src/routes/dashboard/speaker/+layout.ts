import type {LoadDashboardSpeaker} from 'types/dashboardLoadTypes';

import {checkAndParseInputDataAsync} from 'helper/parseJson';
import {apiUrl} from 'helper/links';
import {z} from 'zod';


export async function load({fetch}: {
    fetch: typeof globalThis.fetch
}): Promise<LoadDashboardSpeaker> {
    const linkFetchPromise = fetch(apiUrl('/dashboard/speaker/video-room/exists'));
    const linkParsePromise = checkAndParseInputDataAsync(
        await linkFetchPromise,
        z.object({exists: z.boolean()}),
        `Serveranfrage für die Existenz von VDO Links nicht erfolgreich.`,
        `Unerwartete Daten für die Existenz von VDO Links.`,
    );

    return {
        containsCurrentVideoLinks: (await linkParsePromise).exists,
    }
}
