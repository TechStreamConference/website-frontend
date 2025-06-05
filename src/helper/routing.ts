import { goto } from "@mateothegreat/svelte5-router";


export const redirect = async (path: string, options?: Parameters<typeof goto>[1]): Promise<ReturnType<typeof goto>> => {
    // Store the URL we want to go back to (the one before current)
    const previousUrl = document.referrer;

    // Perform the navigation
    await goto(path, options);

    // After navigation, modify history to remove the redirected-from page
    window.history.replaceState(null, '', previousUrl);
    window.history.pushState(null, '', path);
};
