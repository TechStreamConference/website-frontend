export function apiUrl(link: string): string {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    if (base_url){
        return `${base_url}${link}`;
    }
    console.error(`VITE_API_BASE_URL is undefined. default to local host.`);
    return 'http://localhost:8080/api' + link;
}

export function imageUrl(link: string): string {
    return apiUrl('/images/' + link);
}
