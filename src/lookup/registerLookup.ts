type RegisterDict = {
    [key: string]: string;
};

const registerLookup: RegisterDict = {
    // username
    "The username field is required.": "Server: Das Namens Feld ist erforderlich.",
    "The username field must be at least 3 characters in length.": "Server: Der Name muss mindestens aus 3 Zeichen bestehen.",
    "The username field cannot exceed 30 characters in length.": "Server: Der Name darf maximal aus 30 Zeichen bestehen.",

    // mail
    "The email field is required.": "Server: Das E-Mail Feld ist erforderlich.",
    "The email field must contain a valid email address.": "Server: Das E-Mail-Feld muss eine gültige E-Mail-Adresse enthalten",

    // password
    "The password field is required.": "Server: Das Passwort Feld ist erforderlich.",
    "PASSWORD_MISSING_FIELD": "Server: Das Passwort Feld ist erforderlich.",
    "PASSWORD_TOO_SHORT": "Server: Dein Passwort ist zu kurz. Mindestanzahl: 8 Zeichen",
    "PASSWORD_MISSING_LOWERCASE_LETTER": "Server: Deinem Passwort fehlt ein kleiner Buchstabe.",
    "PASSWORD_MISSING_UPPERCASE_LETTER": "Server: Deinem Passwort fehlt ein großer Buchstabe.",
    "PASSWORD_MISSING_NUMBER": "Server; Deinem Passwort fehlt eine Zahl.",
    "PASSWORD_MISSING_SPECIAL_CHARACTER": "Server: Deinem Passwort fehlt ein Sonderzeichen.",
};

export function RegisterLookup(key: string): string {
    console.log("lookup key: " + key);
    if (key in registerLookup) {
        return registerLookup[key];
    }

    return key;
}
