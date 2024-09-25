import { redirect } from '@sveltejs/kit';
import { loginStatus } from 'stores/auth';
import { apiUrl } from './links';

async function fetchLoginStatusAsync(fetch: Function): Promise<boolean> {
    const response: Response = await fetch(apiUrl('/api/account'));
    return response.ok;
}

export async function getLoginStatusAsync(fetch: Function): Promise<boolean> {
    let status: boolean | null = null;
    loginStatus.update(value => { status = value; return value; });

    if (status === null) {
        const fetchedStatus = await fetchLoginStatusAsync(fetch);
        loginStatus.set(fetchedStatus);
        return fetchedStatus;
    }

    return status;
}

export async function redirectIfUnauthorizedAsync(fetch: Function) {
    const status: boolean = await getLoginStatusAsync(fetch);
    if (!status) {
        redirect(302, '/login?showLoginMessage=true');
    }
    return status;
}

export async function udpateLoginStatusAsync(fetch: Function): Promise<void> {
    const response: boolean = await fetchLoginStatusAsync(fetch);
    loginStatus.set(response);
}
