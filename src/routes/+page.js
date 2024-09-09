export async function load({ fetch }) {
    const loggedInResult = await fetch('/api/account');
    const loggedIn = loggedInResult.ok;

    const currentYear = 2025; // TODO: load from database

    return {
        currentYear: currentYear,
        loggedIn: loggedIn
    }
}
