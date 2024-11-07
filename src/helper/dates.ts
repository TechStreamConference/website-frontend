export type TimeDate = {
    date: string;
    time: string;
};

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
    };

    return format.replace(/%YYYY|%MM|%M|%DD|%D|%d|%hh|%h|%mm|%m/g, matched => map[matched]);
}


export function splitTimeAndDate(timeAndDate: string): TimeDate {
    const split = timeAndDate.split(' ');
    if (split.length !== 2) {
        console.log('not able to split date and time properly');
        return {
            date: "",
            time: "",
        }
    }
    return {
        date: split[0],
        time: split[1],
    }
}

export function combineTimeAndDate(timeAndDate: TimeDate): string {
    return `${timeAndDate.date} ${timeAndDate.time}`;
}
