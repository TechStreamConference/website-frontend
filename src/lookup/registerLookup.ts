type RegisterDict = {
    [key: string]: string;
};

const lookup: RegisterDict = {
    // username
    'The username field is required.':                             'Das Feld \'Name\' ist erforderlich.',
    'The username field must be at least 3 characters in length.': 'Der Name muss mindestens aus 3 Zeichen bestehen.',
    'The username field cannot exceed 30 characters in length.':   'Der Name darf maximal aus 30 Zeichen bestehen.',

    // mail
    'The email field is required.':                        'Das Feld \'E-Mail\' ist erforderlich.',
    'The email field must contain a valid email address.': 'Das E-Mail-Feld muss eine gültige E-Mail-Adresse enthalten',

    // username or mail
    USERNAME_OR_EMAIL_ALREADY_TAKEN: 'Name oder E-Mail sind bereits vergeben',

    // password
    'The password field is required.':  'Das Feld \'Passwort\' ist erforderlich.',
    PASSWORD_MISSING_FIELD:             'Das Feld \'Passwort\' ist erforderlich.',
    PASSWORD_TOO_SHORT:                 'Dein Passwort ist zu kurz. Mindestanzahl: 8 Zeichen',
    PASSWORD_MISSING_LOWERCASE_LETTER:  'Deinem Passwort fehlt ein Kleinbuchstabe.',
    PASSWORD_MISSING_UPPERCASE_LETTER:  'Deinem Passwort fehlt ein Großbuchstabe.',
    PASSWORD_MISSING_NUMBER:            'Deinem Passwort fehlt eine Ziffer.',
    PASSWORD_MISSING_SPECIAL_CHARACTER: 'Deinem Passwort fehlt ein Sonderzeichen.',

    // token
    TOKEN_EXPIRED_OR_DOES_NOT_EXIST: 'Der Link ist ungültig oder bereits abgelaufen.',
};

export function registerLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
