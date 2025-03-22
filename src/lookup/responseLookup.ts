type ResponseDict = {
    [key: string]: string;
};

const lookup: ResponseDict = {
    // name
    'The username field is required.':                                                    'Das Feld \'Name\' ist erforderlich.',
    'The username field must be at least 3 characters in length.':                        'Der Name muss mindestens aus 3 Zeichen bestehen.',
    'The username field cannot exceed 30 characters in length.':                          'Der Name darf maximal aus 30 Zeichen bestehen.',
    'The username field may only contain alphanumeric, underscore, and dash characters.': 'Der Name darf nur aus Buchstaben, Zahlen und Unterstrichen bestehen',
    USERNAME_ALREADY_TAKEN:                                                               'Der Name ist bereits vergeben.',


    // email
    'The email field is required.':                        'Das Feld \'E-Mail\' ist erforderlich.',
    'The email field must contain a valid email address.': 'Das E-Mail-Feld muss eine gültige E-Mail-Adresse enthalten',
    EMAILS_EQUAL:                                          'Die neue und die alte E-Mail ist gleich',

    // name or mail
    USERNAME_OR_EMAIL_FIELD_MISSING: 'Name/E-Mail oder Passwort fehlt.',
    USERNAME_OR_EMAIL_ALREADY_TAKEN: 'Name oder E-Mail sind bereits vergeben',
    UNKNOWN_USERNAME_OR_EMAIL:       'Name oder E-Mail ungültig.',

    // password
    'The password field is required.':  'Das Feld \'Passwort\' ist erforderlich.',
    PASSWORD_MISSING_FIELD:             'Das Feld \'Passwort\' ist erforderlich.',
    PASSWORD_TOO_SHORT:                 'Dein Passwort ist zu kurz. Mindestanzahl: 8 Zeichen',
    PASSWORD_MISSING_LOWERCASE_LETTER:  'Deinem Passwort fehlt ein Kleinbuchstabe.',
    PASSWORD_MISSING_UPPERCASE_LETTER:  'Deinem Passwort fehlt ein Großbuchstabe.',
    PASSWORD_MISSING_NUMBER:            'Deinem Passwort fehlt eine Ziffer.',
    PASSWORD_MISSING_SPECIAL_CHARACTER: 'Deinem Passwort fehlt ein Sonderzeichen.',
    PASSWORDS_EQUAL:                    'Das neue und das alte Passwort ist gleich.',
    WRONG_PASSWORD:                     'Passwort ungültig.',

    // token
    TOKEN_EXPIRED_OR_DOES_NOT_EXIST: 'Der Link ist ungültig oder bereits abgelaufen.',

    // status
    NOT_LOGGED_IN: 'Du bist aktuell nicht eingeloggt',
    FORBIDDEN:     'Du hast keine Berechtigung für diese Seite.',

    // speaker
    USER_ALREADY_IS_SPEAKER:                      'Du hast dich bereits beworben.\nDaher kannst du dich nicht erneut bewerben.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    CURRENTLY_NOT_ACCEPTING_SPEAKER_APPLICATIONS: 'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    USER_ALREADY_HAS_PENDING_APPLICATION:         'Du hast dich bereits für dieses Jahr beworben\nWir sind gerade dabei, deine Bewerbung zu überprüfen.\nSobald wir deine Bewerbung angenommen haben, kannst du deinen Eintrag im Speaker-Tab bearbeiten.',
    NO_EVENT_TO_APPLY_FOR:                        'Aktuell kann man sich nicht bewerben.\nSchau gerne bei der nächsten Bewerbungsphase wieder vorbei.\nWenn du bereits ein Speaker bist, kannst du deine Daten im Speaker-Tab bearbeiten.',
    SPEAKER_CANNOT_BE_REJECTED:                   'Dieser Speaker kann nicht abgelehnt werden.',

    // talk
    TALK_ALREADY_APPROVED:                         'Der Talk ist bereits freigegeben.',
    TALK_NOT_FOUND:                                'Da haben wir wohl diesen Talk verlegt. Vielleicht finden wir ihn bald wieder.',
    DUPLICATE_TALK:                                'Diesen Talk gibt es bereits.',
    TALK_CREATION_FAILED:                          'Fehler beim Erstellen des Talks.',
    INVALID_DURATION:                              'Ungültige Längenangabe des Talks.',
    NO_TAGS:                                       'Füge mindestens ein Tag hinzu',
    'The title field is required.':                'Das Feld \'Titel\' ist erforderlich.',
    'The description field is required.':          'Das Feld \'Beschreibung\' ist erforderlich.',
    'The tag_ids.* field is required.':            'Wähle durch Anklicken mindestens einen Tag aus, der zu deinem Vortrag passt.',
    'The possible_durations.* field is required.': 'Wähle bitte eine oder mehrere mögliche Vortragsdauern aus.',

    // time slots
    TIME_SLOTS_OVERLAP:                'Mindestens 2 Vortragszeiten überlappen sich.',
    TIME_SLOT_ALREADY_OCCUPIED:        'Dieser Slot ist bereits vergeben.',
    TIME_SLOT_INVALID_DURATION:        'Dieser Slot stimmt nicht mit den gewünschten Längen überein',
    CANNOT_DELETE_ASSIGNED_TIME_SLOTS: 'Es ist nicht möglich, Time Slots zu editieren, da einige Slots schon zugewiesen sind.',

    // no changes
    NO_CHANGES_DETECTED: 'Es wurden keine Änderungen vorgenommen.',
    NO_CHANGES:          'Es wurden keine Änderungen vorgenommen.',

    // guests
    'The guest_ids.* field is required.': 'Wähle mindestens einen Gast aus.',
    DUPLICATE_GUEST:                      'Mindestens ein Gast ist doppelt vorhanden.',
    HOST_AS_GUEST:                        'Mindestens ein Gast ist auch Host des ausgewählten Talks.',
    INVALID_GUEST:                        'Mindestens ein Gast hat einen ungültigen Speaker-Eintrag.',

    // contact
    'The name field is required.':    'Das Feld \'Name\' ist erforderlich.',
    'The message field is required.': 'Das Feld \'Nachricht\' ist erforderlich.',
    'The subject field is required.': 'Das feld \'Betreff\' ist erforderlich.',

    // video room
    VIDEO_ROOM_DOES_NOT_EXIST: 'Keine Links zum Verschicken vorhanden.',
};

export function responseLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    console.error(`Fehler beim response lookup - key: '${key}'`);

    return '👻 Ein unbekannter Fehler ist aufgetreten. Upsi. 👻';
}
