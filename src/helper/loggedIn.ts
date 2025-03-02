import type { DashboardRoles } from 'types/dashboardProvideTypes';
import { dashboardRolesScheme } from 'types/dashboardProvideTypes';

import { redirect } from '@sveltejs/kit';
import { apiUrl } from './links';
import { checkAndParseInputDataAsync } from './parseJson';

export async function fetchLoginStatusAsync(fetch: typeof globalThis.fetch): Promise<boolean> {
    const response: Response = await fetch(apiUrl('/account/roles'));
    return response.ok;
}

export async function redirectIfUnauthorizedOrReturnRolesAsync(fetch: typeof globalThis.fetch): Promise<DashboardRoles> {
    const response: Response = await fetch(apiUrl('/account/roles'));
    if (!response.ok) {
        throw redirect(302, '/login?showLoginMessage=true');
    }

    return await checkAndParseInputDataAsync(
        response,
        dashboardRolesScheme,
        `Serveranfrage für roles nicht erfolgreich.`,
        `Unerwartete Daten für roles.`,
    );
}
