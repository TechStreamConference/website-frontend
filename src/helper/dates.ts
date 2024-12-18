const lookup: string[] = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
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
        '%s': String(date.getSeconds()),
        '%ss': String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/%YYYY|%MM|%M|%DD|%D|%d|%hh|%h|%mm|%m|%ss|%s/g, matched => map[matched]);
}


export function convertTimeAndDateToHTML(timeAndDate: string): string {
    return timeAndDate.replace(' ', 'T');
}

export function convertTimeAndDateToSQL(timeAndDate: string | null): string | null {
    if (!timeAndDate) {
        return null;
    }
    return timeAndDate.replace('T', ' ');
}

export function checkSQLTimeAndDate(timeAndDate: string | null): string | null {
    if (!timeAndDate) {
        return null;
    }

    const reference: string = 'YYYY-MM-DDThh:mm:ss';
    if (timeAndDate.length < reference.length) {
        timeAndDate += ":00";
    }

    return timeAndDate;
}

export function isBeforeOrSameDatesString(lhs: string, rhs: string): boolean {
    return isBeforeOrSameDates(new Date(lhs), new Date(rhs));
}

export function isBeforeOrSameDates(lhs: Date, rhs: Date): boolean {
    return lhs.getTime() <= rhs.getTime();
}

export function isPassedNowString(date: string): boolean {
    return isPassedNow(new Date(date));
}

export function isPassedNow(date: Date): boolean {
    return isBeforeOrSameDates(new Date(), date);
}
