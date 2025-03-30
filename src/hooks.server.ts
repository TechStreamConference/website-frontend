import {error, type HandleFetch} from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import {dev} from "$app/environment";

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    const cookies = event.request.headers.get("cookie")
    console.log(`[handleFetch] cookies: ${cookies}`);
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

    if (dev) {
        request.headers.set('x-real-ip', '127.0.0.1');
    } else {
        const ip = event.request.headers.get('x-real-ip');
        if (!ip) {
            console.error('[handleFetch] x-real-ip header is missing.');
            throw error(500);
        }
        request.headers.set('x-real-ip', ip);
    }
    return fetch(request);
};
