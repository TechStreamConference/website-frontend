type ResponseDict = {
    [key: string]: string;
};

const lookup: ResponseDict = {
    'The username field is required.':                             'Das Feld \'Name\' ist erforderlich.',
    'The username field must be at least 3 characters in length.': 'Der Name muss mindestens aus 3 Zeichen bestehen.',
    'The username field cannot exceed 30 characters in length.':   'Der Name darf maximal aus 30 Zeichen bestehen.',
    USERNAME_ALREADY_TAKEN:                                        'Der Name ist bereits vergeben.',

    'The email field is required.':                        'Das Feld \'E-Mail\' ist erforderlich.',
    'The email field must contain a valid email address.': 'Das E-Mail-Feld muss eine gültige E-Mail-Adresse enthalten',

    USERNAME_OR_EMAIL_ALREADY_TAKEN: 'Name oder E-Mail sind bereits vergeben',

    'The password field is required.':  'Das Feld \'Passwort\' ist erforderlich.',
    PASSWORD_MISSING_FIELD:             'Das Feld \'Passwort\' ist erforderlich.',
    PASSWORD_TOO_SHORT:                 'Dein Passwort ist zu kurz. Mindestanzahl: 8 Zeichen',
    PASSWORD_MISSING_LOWERCASE_LETTER:  'Deinem Passwort fehlt ein Kleinbuchstabe.',
    PASSWORD_MISSING_UPPERCASE_LETTER:  'Deinem Passwort fehlt ein Großbuchstabe.',
    PASSWORD_MISSING_NUMBER:            'Deinem Passwort fehlt eine Ziffer.',
    PASSWORD_MISSING_SPECIAL_CHARACTER: 'Deinem Passwort fehlt ein Sonderzeichen.',

    TOKEN_EXPIRED_OR_DOES_NOT_EXIST: 'Der Link ist ungültig oder bereits abgelaufen.',

    USERNAME_OR_EMAIL_FIELD_MISSING: 'Name/E-Mail oder Passwort fehlt.',
    UNKNOWN_USERNAME_OR_EMAIL:       'Name oder E-Mail ungültig.',
    WRONG_PASSWORD:                  'Passwort ungültig.',
    NOT_LOGGED_IN:                   'Du bist aktuell nicht eingeloggt',
    FORBIDDEN:                       'Du hast keine Berechtigung für diese Seite.',

    USER_ALREADY_IS_SPEAKER:                      'Du hast dich bereits beworben.\nDaher kannst du dich nicht erneut bewerben.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    CURRENTLY_NOT_ACCEPTING_SPEAKER_APPLICATIONS: 'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    USER_ALREADY_HAS_PENDING_APPLICATION:         'Du hast dich bereits für dieses Jahr beworben\nWir sind gerade dabei, deine Bewerbung zu überprüfen.\nSobald wir deine Bewerbung angenommen haben, kannst du deinen Eintrag im Speaker-Tab bearbeiten.',
    NO_EVENT_TO_APPLY_FOR:                        'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',

};

export function responseLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
