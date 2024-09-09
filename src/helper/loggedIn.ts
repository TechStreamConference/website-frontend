import { redirect } from '@sveltejs/kit';


export async function checkAndRedirect(fetch: Function, link: string, expectedLogginStatus: boolean) {
    const result = await checkLoggedIn(fetch);
    if (result !== expectedLogginStatus) {
        redirect(201, link);
    }
}

export async function checkLoggedIn(fetch: Function) {
    const loggedInResult = await fetch('/api/account');
    return loggedInResult.ok;
}