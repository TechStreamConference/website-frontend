import { redirect } from '@sveltejs/kit';
import { loginStatus } from 'stores/auth';

async function fetchLoginStatus(fetch: Function): Promise<boolean> {
    const response: Response = await fetch('/api/account');
    return response.ok;
}

export async function getLoginStatus(fetch: Function): Promise<boolean> {
    let status: boolean | null = null;
    loginStatus.subscribe(value => { status = value });

    if (status === null) {
        const fetchedStatus = await fetchLoginStatus(fetch);
        loginStatus.set(fetchedStatus);
        return fetchedStatus;
    }

    return status;
}

export async function getLoginStatusAndCheckRedirect(fetch: Function, link: string, expectedLogginStatus: boolean): Promise<boolean> {
    const status: boolean = await getLoginStatus(fetch);
    if (status !== expectedLogginStatus) {
        redirect(302, link);
    }
    return status;
}

export async function udpateLoginStatus(fetch: Function): Promise<void> {
    const response: boolean = await fetchLoginStatus(fetch);
    loginStatus.set(response);
}
