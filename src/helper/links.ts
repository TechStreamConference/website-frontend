const prefix: string = 'http://localhost:8080';

export function apiUrl(link: string): string {
    return prefix + link;
}

export function imageUrl(link: string): string {
    return prefix + '/api/images/' + link;
}
