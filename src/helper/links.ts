export function apiUrl(link: string): string {
    return 'http://localhost:8080/api' + link;
}

export function imageUrl(link: string): string {
    return apiUrl('/images/' + link);
}
