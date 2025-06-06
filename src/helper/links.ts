// import { env } from "$env/dynamic/public";

export function api_url(link: string): string {
    let urlBase = 'http://localhost/api';
    /*
    if (env.PUBLIC_API_BASE_URL_CSR) {
        urlBase = env.PUBLIC_API_BASE_URL_CSR;
    } else {
        console.error('[apiUrl] env.PUBLIC_API_BASE_URL_CSR is not set.');
    }
    */
    console.error('[apiUrl] env.PUBLIC_API_BASE_URL_CSR is not set.');
    return urlBase + link;
}

export function image_url(link: string): string {
    return api_url('/images/' + link);
}
