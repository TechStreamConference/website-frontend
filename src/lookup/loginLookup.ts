type LoginDict = {
    [key: string]: string;
};

const lookup: LoginDict = {
    "Username/email or password missing": "Name / E-Mail oder Passwort fehlt.",
    "Unknown username or email": "Name / E-mail oder Passwort ungültig.",
    "Invalid password": "Name / E-mail oder Passwort ungültig.",
}

export function loginLookup(key: string): string {
    if (key in lookup) {
        return lookup[key];
    }

    return key;
}
