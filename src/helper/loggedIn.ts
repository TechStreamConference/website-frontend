import { redirect } from '@sveltejs/kit';

// this should only be called from svelte functions like load.
// otherwise this could cause internal server errors because of the redirect. 
export async function checkAndRedirect(fetch: Function, link: string, expectedLogginStatus: boolean): Promise<boolean> {
    const result = await checkLoggedIn(fetch);
    if (result !== expectedLogginStatus) {
        console.log("Should redirect");
        redirect(302, link);
    }

    return result;
}

export async function checkLoggedIn(fetch: Function): Promise<boolean> {
    const loggedInResult = await fetch('/api/account');
    return loggedInResult.ok;
}