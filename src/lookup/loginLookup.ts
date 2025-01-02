type LoginDict = {
    [key: string]: string;
};

const lookup: LoginDict = {
    USERNAME_OR_EMAIL_FIELD_MISSING: 'Name/E-Mail oder Passwort fehlt.',
    UNKNOWN_USERNAME_OR_EMAIL:          'Name oder E-Mail ungültig.',
    WRONG_PASSWORD:                   'Passwort ungültig.',
    NOT_LOGGED_IN:                      'Du bist aktuell nicht eingeloggt',
    FORBIDDEN:                          'Du hast keine Berechtigung für diese Seite.',
};

export function loginLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
