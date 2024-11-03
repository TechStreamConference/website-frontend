import type { DashboardRoles } from 'types/dashboardProvideTypes';

import { redirect } from '@sveltejs/kit';
import { apiUrl } from './links';
import { checkAndParseInputDataAsync } from './parseJson';
import { dashboardRolesScheme } from 'types/dashboardProvideTypes';

export async function fetchLoginStatusAsync(fetch: Function): Promise<boolean> {
    const response: Response = await fetch(apiUrl('/api/account/roles'));
    return response.ok;
}

export async function redirectIfUnauthorizedOrReteturnRolesAsync(fetch: Function): Promise<DashboardRoles> {
    const response: Response = await fetch(apiUrl('/api/account/roles'));
    if (!response.ok) {
        throw redirect(302, '/login?showLoginMessage=true');
    }

    const roles: DashboardRoles = await checkAndParseInputDataAsync<DashboardRoles>(
        response,
        dashboardRolesScheme,
        `Serveranfrage für roles nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für roles. throw error(404)`
    );

    return roles;
}
