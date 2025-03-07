import type { LoadUserApplication } from 'types/dashboardLoadTypes';
import {
    dashboardAllSocialMediaLinkTypeScheme, dashboardEventApplicationScheme,
} from 'types/dashboardProvideTypes';
import { simpleErrorScheme } from 'types/provideTypes';

import { apiUrl } from 'helper/links';
import { error } from '@sveltejs/kit';
import { responseLookup } from 'lookup/responseLookup';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { redirectIfUnauthorizedOrReturnRolesAsync } from 'helper/loggedIn';

export async function load({ fetch }: {
    fetch: typeof globalThis.fetch
}): Promise<LoadUserApplication> {
    const eventResponse      = await fetch(apiUrl('/dashboard/user/get-application-event'));
    const socialTypesPromise = fetch(apiUrl('/social-media-link-types'));
    const rolesPromise       = redirectIfUnauthorizedOrReturnRolesAsync(fetch);
    const eventJson          = await (async () => {
        try {
            return await eventResponse.json();
        } catch {
            throw error(406, 'not able to parse event json in application page');
        }
    })();
    const event              = (() => {
        if ('event' in eventJson) {
            return dashboardEventApplicationScheme.safeParse(eventJson['event']);
        }

        return undefined;
    })();

    if (!event || !event.success) {
        console.error(event ? event.error : 'event in event json is undefined');
        const myError = simpleErrorScheme.safeParse(eventJson);
        if (!myError.success) {
            console.error(myError.error);
            throw error(406, 'not able to parse event data in application page');
        }

        myError.data.error = responseLookup(myError.data.error);

        return {
            data:  undefined,
            error: myError.data,
        };
    }

    const roles       = await rolesPromise;
    const socialTypes = await checkAndParseInputDataAsync(
        await socialTypesPromise,
        dashboardAllSocialMediaLinkTypeScheme,
        `Serveranfrage für alle Social Media Links Types nicht erfolgreich.`,
        `Unerwartete Daten für alle Social Media Links Types.`,
    );

    return {
        data:  {
            event:   event.data,
            speaker: {
                allEvents: [],
                event:     {
                    id:                event.data.id,
                    name:              '',
                    short_bio:         '',
                    bio:               '',
                    photo:             '',
                    user_id:           roles.user_id,
                    visible_from:      null,
                    is_approved:       false,
                    requested_changes: null,
                },
                current:   {
                    event_id: event.data.id,
                    title:    event.data.title,
                },
            },
            socials: {
                socials: [],
                socialTypes,
            },
        },
        error: undefined,
    };

}
