import { afterNavigate } from '$app/navigation';

export function setupNavigationReload() {
    let lastUrl = window.location.href;

    afterNavigate(({ to }) => {
        if (to === null) {
            console.error(`To was null while checking navigation reload`);
            return;
        }
        const currentUrl = new URL(lastUrl);
        const newUrl     = new URL(to.url, window.location.href);

        // @formatter:off
        if (   currentUrl.pathname === newUrl.pathname
            && currentUrl.search   === newUrl.search
            && currentUrl.hash     === newUrl.hash) {
        // @formatter:on
            window.location.reload();
        }

        lastUrl = newUrl.href;
    });
}
