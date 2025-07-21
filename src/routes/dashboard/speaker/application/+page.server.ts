import type {LoadSpeakerApplication} from 'types/dashboardLoadTypes';

import {apiUrl} from 'helper/links';
import {checkAndParseInputDataAsync, parseMultipleInfosAsync} from 'helper/parseJson';
import {allTalkTagScheme} from 'types/provideTypes';
import {dashboardEventScheme, dashboardTalkDurationChoicesScheme} from 'types/dashboardProvideTypes';
import {z} from 'zod';

export async function load({fetch}: {
    fetch: typeof globalThis.fetch
}): Promise<LoadSpeakerApplication> {
    const canApplyFetchPromise = fetch(apiUrl('/dashboard/speaker/can-submit-talk'));
    const allTagsFetchPromise = fetch(apiUrl('/tags'));
    const allTalkDurationFetchPromise = fetch(apiUrl('/talk-duration-choices'));

    if (!(await canApplyFetchPromise).ok) { // not able for current speaker to apply a talk
        const errors = await parseMultipleInfosAsync(await canApplyFetchPromise);
        return {
            canApply: false,
            applyError: errors['error'],
            event: undefined,
            tags: [],
            talkDurations: [],
        };
    }

    const applyScheme = z.object({
        can_submit_talk: z.boolean(),
        event: dashboardEventScheme,
    });
    const canApplyParsePromise = checkAndParseInputDataAsync(await canApplyFetchPromise,
        applyScheme,
        'Serveranfrage für can_apply check nicht erfolgreich',
        'unerwartete Daten für can_apply check',
    );
    const allTagsParsePromise = checkAndParseInputDataAsync(await allTagsFetchPromise,
        allTalkTagScheme,
        `Serveranfrage für alle Talk-Tags nicht erfolgreich;`,
        `Unerwartete Daten für alle Talk-Tags;`,
    );
    const allTalkDurationParsePromise = checkAndParseInputDataAsync(
        await allTalkDurationFetchPromise,
        dashboardTalkDurationChoicesScheme,
        `Serveranfrage für alle Talk-Längen nicht erfolgreich;`,
        `Unerwartete Daten für alle Talk-Längen;`,
    );

    return {
        canApply: (await canApplyParsePromise).can_submit_talk,
        applyError: '',
        event: (await canApplyParsePromise).event,
        tags: await allTagsParsePromise,
        talkDurations: await allTalkDurationParsePromise,
    };
}
