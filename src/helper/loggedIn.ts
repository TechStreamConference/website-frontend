import { redirect } from '@sveltejs/kit';
import { apiUrl } from './links';
import { checkAndParseInputDataAsync } from './parseJson';
import { rolesScheme, type Roles } from 'types/provideTypes';

export async function fetchLoginStatusAsync(fetch: Function): Promise<boolean> {
    const response: Response = await fetch(apiUrl('/api/account/roles'));
    return response.ok;
}

export async function redirectIfUnauthorizedOrReteturnRolesAsync(fetch: Function): Promise<Roles> {
    const response: Response = await fetch(apiUrl('/api/account/roles'));
    if (!response.ok) {
        throw redirect(302, '/login?showLoginMessage=true');
    }

    const roles: Roles = await checkAndParseInputDataAsync<Roles>(
        response,
        rolesScheme,
        `Serveranfrage für roles nicht erfolgreich. throw error(404)`,
        `Unerwartete Daten für roles. throw error(404)`
    );

    return roles;
}
