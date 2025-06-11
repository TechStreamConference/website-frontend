const lookup: string[] = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
];

export function format_date(provided: string, format: string): string {
    const date = new Date(provided);

    const map: {
        [key: string]: string
    } = {
        '%YYYY': String(date.getFullYear()),
        '%M':    String(date.getMonth() + 1),
        '%MM':   String(date.getMonth() + 1).padStart(2, '0'),
        '%D':    String(date.getDate()),
        '%DD':   String(date.getDate()).padStart(2, '0'),

        '%d':  lookup[date.getDay()],
        '%h':  String(date.getHours()),
        '%hh': String(date.getHours()).padStart(2, '0'),
        '%m':  String(date.getMinutes()),
        '%mm': String(date.getMinutes()).padStart(2, '0'),
        '%s':  String(date.getSeconds()),
        '%ss': String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/%YYYY|%MM|%M|%DD|%D|%d|%hh|%h|%mm|%m|%ss|%s/g, (matched) => map[matched]);
}

export function convert_time_and_date_to_HTML(timeAndDate: string): string {
    return timeAndDate.replace(' ', 'T');
}

export function convert_time_and_date_to_SQL(timeAndDate: string | null): string | null {
    if (!timeAndDate) {
        return null;
    }
    return timeAndDate.replace('T', ' ');
}

export function check_SQL_time_and_date(timeAndDate: string | null): string | null {
    if (!timeAndDate) {
        return null;
    }

    const reference: string = 'YYYY-MM-DDThh:mm:ss';
    if (timeAndDate.length < reference.length) {
        timeAndDate += ':00';
    }

    return timeAndDate;
}

export function is_before_or_same_dates_string(lhs: string, rhs: string): boolean {
    return is_before_or_same_dates(new Date(lhs), new Date(rhs));
}

export function is_before_or_same_dates(lhs: Date, rhs: Date): boolean {
    return lhs.getTime() <= rhs.getTime();
}

export function is_past_now_string(date: string): boolean {
    return is_past_now(new Date(date));
}

export function is_past_now(date: Date): boolean {
    return is_before_or_same_dates(new Date(), date);
}
