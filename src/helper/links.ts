const prefix: string = "http://localhost:8080";

export function apiUrl(link: string): string {
    return prefix + link;
}

export function personImageUrl(link: string): string {
    return prefix + '/api/' + link;
}
