type ApplicationDict = {
    [key: string]: string;
};


const lookup: ApplicationDict = {
    USER_ALREADY_IS_SPEAKER:                      'Du hast dich bereits beworben.\nDaher kannst du dich nicht erneut bewerben.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    CURRENTLY_NOT_ACCEPTING_SPEAKER_APPLICATIONS: 'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    USER_ALREADY_HAS_PENDING_APPLICATION:         'Du hast dich bereits für dieses Jahr beworben\nWir sind gerade dabei, deine Bewerbung zu überprüfen.\nSobald wir deine Bewerbung angenommen haben, kannst du deinen Eintrag im Speaker-Tab bearbeiten.',
    NO_EVENT_TO_APPLY_FOR:                        'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
};


export function applicationLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
