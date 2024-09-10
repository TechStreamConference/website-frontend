import { redirect } from '@sveltejs/kit';
import { loginStatus } from 'stores/auth';

async function fetchLoginStatus(fetch: Function): Promise<boolean> {
    console.log("fetcching");
    const response = await fetch('/api/account');
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
    const status = await getLoginStatus(fetch);
    if (status !== expectedLogginStatus) {
        redirect(302, link);
    }
    return status;
}

export function querryLogin() {
    loginStatus.set(true);
}

export function querryLogout() {
    loginStatus.set(false);
}
