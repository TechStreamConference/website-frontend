import { redirect } from '@sveltejs/kit';
import { loginStatus } from 'stores/auth';

async function fetchLoginStatus(fetch: Function): Promise<boolean> {
    const response: Response = await fetch('/api/account');
    return response.ok;
}

export async function getLoginStatus(fetch: Function): Promise<boolean> {
    let status: boolean | null = null;
    loginStatus.update(value => { status = value; return value; });

    if (status === null) {
        const fetchedStatus = await fetchLoginStatus(fetch);
        loginStatus.set(fetchedStatus);
        return fetchedStatus;
    }

    return status;
}

export async function redirectIfUnauthorized(fetch: Function) {
    const status: boolean = await getLoginStatus(fetch);
    if (!status) {
        redirect(302, '/login?showLoginMessage=true');
    }
    return status;
}

export async function udpateLoginStatus(fetch: Function): Promise<void> {
    const response: boolean = await fetchLoginStatus(fetch);
    loginStatus.set(response);
}
