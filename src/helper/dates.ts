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
        '%YYYY': String(date.getFullYear()),
        '%M': String(date.getMonth() + 1),
        '%MM': String(date.getMonth() + 1).padStart(2, '0'),
        '%D': String(date.getDate()),
        '%DD': String(date.getDate()).padStart(2, '0'),

        '%d': lookup[date.getDay()],
        '%h': String(date.getHours()),
        '%hh': String(date.getHours()).padStart(2, '0'),
        '%m': String(date.getMinutes()),
        '%mm': String(date.getMinutes()).padStart(2, '0'),
    };

    return format.replace(/%YYYY|%MM|%M|%DD|%D|%d|%hh|%h|%mm|%m/g, matched => map[matched]);
}
