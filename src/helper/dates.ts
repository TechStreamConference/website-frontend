export const dateFull: string = "%d.%m.%y";
export const dateShort: string = "%d.%m.";

const lookup: string[] = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
];

export function formatDate(provided: string, format: string): string {
    const date = new Date(provided);

    const map: { [key: string]: string } = {
        '%y': String(date.getFullYear()),
        '%m': String(date.getMonth() + 1).padStart(2, '0'),
        '%d': String(date.getDate()).padStart(2, '0'),
        '%D': lookup[date.getDay()],
    };

    return format.replace(/%y|%m|%d|%D/gi, matched => map[matched]);
}
