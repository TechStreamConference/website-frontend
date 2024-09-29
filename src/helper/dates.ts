export function formatDate(provided: string): string {
    const date = new Date(provided);
    return date.toLocaleDateString();
}