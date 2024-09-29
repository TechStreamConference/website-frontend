export function formatDate(provided: string, format: string): string {
    const date = new Date(provided);

    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: string = String(date.getFullYear());

    return format
        .replace('%d', day)
        .replace('%m', month)
        .replace('%y', year);
}
