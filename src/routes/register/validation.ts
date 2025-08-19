import {apiUrl} from 'helper/links';
import {z} from 'zod';
import {parseProvidedJsonAsync} from 'helper/parseJson';

const existsResponseDataScheme = z.object({
    exists: z.boolean(),
});

export async function onUsernameChangedAsync(username: string, fetch: typeof globalThis.fetch): Promise<string | undefined> {
    const trimmed: string = username.trim();

    if (trimmed.length === 0) {
        return 'Das Feld "Anmeldename" ist leer.';
    }

    if (trimmed.length < 3) {
        return 'Der Anmeldename muss mindestens 3 Zeichen enthalten.';
    }

    if (trimmed.length > 30) {
        return 'Der Anmeldename darf maximal 30 Zeichen enthalten.';
    }

    if (trimmed.includes(' ')) {
        return 'Der Anmeldename darf keine Leerzeichen enthalten.';
    }

    const response: Response = await fetch(apiUrl('/account/username/exists?username=' + trimmed));
    if (!response.ok) {
        console.error('Fehler beim Überprüfen des Anmeldenamens. Fehlercode: ' + response.status);
        return;
    }

    const data = await parseProvidedJsonAsync(response, existsResponseDataScheme);
    if (!data) {
        console.error('Error while checking username');
        return;
    }

    if (data.exists) {
        return `Der Anmeldename "${trimmed}" ist bereits vergeben.`;
    }
}

export async function onMailChangedAsync(mail: string, fetch: typeof globalThis.fetch): Promise<string | undefined> {
    const trimmed: string = mail.trim();

    if (trimmed.length === 0) {
        return 'Das Feld "E-Mail" ist leer.';
    }

    const validated = z.string().email().safeParse(trimmed);
    if (!validated.success) {
        return 'Die angegebene E-Mail-Adresse ist nicht gültig.';
    }

    const response: Response = await fetch(apiUrl('/account/email/exists?email=' + trimmed));
    if (!response.ok) {
        console.error('Error while fetching email check. error code: ' + response.status);
        return;
    }

    const data = await parseProvidedJsonAsync(response, existsResponseDataScheme);
    if (!data) {
        console.error('Error while parsing mail check');
        return;
    }

    if (data.exists) {
        return `Die E-Mail "${trimmed}" wird bereits verwendet.`;
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
        return 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.';
    }

    const hasUpperCase: boolean = /[A-Z]/.test(trimmed);
    if (!hasUpperCase) {
        return 'Das Passwort muss mindestens einen Großbuchstaben enthalten.';
    }

    const hasNumber: boolean = /[0-9]/.test(trimmed);
    if (!hasNumber) {
        return 'Das Passwort muss mindestens eine Ziffer enthalten.';
    }

    const hasSpecialCharacter: boolean = /[!@#$%^&*()\-_+={};:,<.>§~ ]/.test(trimmed);
    if (!hasSpecialCharacter) {
        return 'Das Passwort muss mindestens ein Sonderzeichen enthalten.';
    }
}
