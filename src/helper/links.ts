import {env} from "$env/dynamic/public";

export function apiUrl(link: string): string {
    let urlBase = 'http://localhost:8080/api';
    if (env.PUBLIC_API_BASE_URL_CSR) {
        urlBase = env.PUBLIC_API_BASE_URL_CSR;
    } else {
        console.error('[apiUrl] env.PUBLIC_API_BASE_URL_CSR is not set.');
    }
    return urlBase + link;
}

export function imageUrl(link: string): string {
    return apiUrl('/images/' + link);
}
