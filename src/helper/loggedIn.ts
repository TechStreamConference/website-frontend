import { redirect } from '@sveltejs/kit';
import { apiUrl } from './links';

export async function fetchLoginStatusAsync(fetch: Function): Promise<boolean> {
    const response: Response = await fetch(apiUrl('/api/account/roles'));
    return response.ok;
}

export async function redirectIfUnauthorizedAsync(fetch: Function) {
    const status: boolean = await fetchLoginStatusAsync(fetch);
    if (!status) {
        throw redirect(302, '/login?showLoginMessage=true');
    }
    return status;
}
