export async function onUsernameChangedAsync(username: string, fetch: Function): Promise<string | undefined> {
    const trimmed: string = username.trim();

    if (trimmed.length === 0) {
        return 'Das Feld "Name" ist leer.';
    }

    if (trimmed.length < 3) {
        return 'Der Name muss mindestens 3 Zeichen enthalten.';
    }

    if (trimmed.length > 30) {
        return 'Der Name darf maximal 30 Zeichen enthalten.';
    }

    const response: Response = await fetch('api/account/username/exists?username=' + trimmed);
    if (!response.ok) {
        console.error('Fehler beim überprüfen des Namen. Fehlercode: ' + response.status);
        return;
    }

    let data: { exists: boolean };
    try {
        data = await response.json();
    } catch (error) {
        console.error('error while parsing username json', error);
        return;
    }

    if (data.exists) {
        return 'Der Name  "' + trimmed + '" ist bereits vergeben.';
    }
}

export async function onMailChangedAsync(mail: string, fetch: Function): Promise<string | undefined> {
    const trimmed: string = mail.trim();

    if (trimmed.length === 0) {
        return 'Das Feld "E-Mail" ist leer.';
    }

    const valid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
        return "Die angegebene E-Mail-Adresse ist nicht gültig.";
    }

    const response: Response = await fetch('api/account/email/exists?email=' + trimmed);
    if (!response.ok) {
        console.error('Fehler beim überprüfen der E-Mail. Fehlercode: ' + response.status);
        return;
    }

    let data: { exists: boolean };
    try {
        data = await response.json();
    } catch (error) {
        console.error('error while parsing email json', error);
        return;
    }

    if (data.exists) {
        return 'Die E-Mail "' + trimmed + '" wird bereits verwendet.';
    }
}

export function onPasswordChanged(password_1: string, password_2: string): string | undefined {
    const trimmed: string = password_1.trim();

    if (trimmed.length === 0) {
        return 'Das Feld "Passwort" ist leer.';
    }

    if (password_2.trim().length === 0) {
        return 'Das Feld "Passwort wiederholen" ist leer.';
    }

    if (trimmed !== password_2.trim()) {
        return 'Die Passwörter stimmen nicht überein.';
    }

    if (trimmed.length < 8) {
        return 'Das Password muss mindestens 8 Zeichen enthalten.';
    }

    const hasLowerCase: boolean = /[a-z]/.test(trimmed);
    if (!hasLowerCase) {
        return 'Das Passwort muss mindestens ein Kleinbuchstaben enthalten.';
    }

    const hasUpperCase: boolean = /[A-Z]/.test(trimmed);
    if (!hasUpperCase) {
        return 'Das Passwort muss mindestens ein Großbuchstaben enthalten.';
    }

    const hasNumber: boolean = /[0-9]/.test(trimmed);
    if (!hasNumber) {
        return 'Das Passwort muss mindestens eine Ziffer enthalten.';
    }

    const hasSpecialCharacter: boolean = /[!@#$%^&*()\-_+=\{};:,<.>§~ ]/.test(trimmed);
    if (!hasSpecialCharacter) {
        return 'Das Passwort muss mindestens ein Sonderzeichen enthalten.';
    }
}
