import type { HandleFetch } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    const cookies = event.request.headers.get("cookie")
    if (!env.PUBLIC_API_BASE_URL_SSR) {
        console.error('[handleFetch] env.PUBLIC_API_BASE_URL_SSR is not set.');
        return fetch(request);
    }
    if (!env.PUBLIC_API_BASE_URL_CSR) {
        console.error('[handleFetch] env.PUBLIC_API_BASE_URL_CSR is not set.');
        return fetch(request);
    }
    const clientUrlBase = env.PUBLIC_API_BASE_URL_CSR;
    const serverUrlBase = env.PUBLIC_API_BASE_URL_SSR;
    request = new Request(
        request.url.replace(clientUrlBase, serverUrlBase),
        request
    );
    request.headers.set('cookie', cookies!);
    return fetch(request);
};
