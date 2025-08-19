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

export function onPasswordChanged(password_1: string, password_2: string, checkFirst: boolean): string | undefined {
    const trimmed_1 = checkFirst ? password_1.trim() : password_2.trim();
    const trimmed_2 = checkFirst ? password_2.trim() : password_1.trim();

    if (trimmed_1.length === 0) {
        return checkFirst ? "Das Feld 'Passwort' ist leer." : "Das Feld 'Passwort wiederholen' ist leer."
    }

    if (trimmed_2.length > 0
        && trimmed_1 !== trimmed_2) {
        return "Die Passwörter stimmen nicht überein."
    }

    // not using trimmed_1 here to make sure the single validation is always performed on the first password
    return validatePasswordSingle(password_1.trim());
}

export function onPasswordValidate(password_1: string, password_2: string): string | undefined {
    const trimmed_1: string = password_1.trim();
    const trimmed_2: string = password_2.trim();

    if (trimmed_1.length === 0) {
        return 'Das Feld "Passwort" ist leer.';
    }

    if (trimmed_2.length === 0) {
        return 'Das Feld "Passwort wiederholen" ist leer.';
    }

    if (trimmed_1 !== trimmed_2) {
        return 'Die Passwörter stimmen nicht überein.';
    }


    return validatePasswordSingle(trimmed_1);
}

function validatePasswordSingle(password: string): string | undefined {
    if (password.length < 8) {
        return 'Das Password muss mindestens 8 Zeichen enthalten.';
    }

    const hasLowerCase: boolean = /[a-z]/.test(password);
    if (!hasLowerCase) {
        return 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.';
    }

    const hasUpperCase: boolean = /[A-Z]/.test(password);
    if (!hasUpperCase) {
        return 'Das Passwort muss mindestens einen Großbuchstaben enthalten.';
    }

    const hasNumber: boolean = /[0-9]/.test(password);
    if (!hasNumber) {
        return 'Das Passwort muss mindestens eine Ziffer enthalten.';
    }

    const hasSpecialCharacter: boolean = /[!@#$%^&*()\-_+={};:,<.>§~ ]/.test(password);
    if (!hasSpecialCharacter) {
        return 'Das Passwort muss mindestens ein Sonderzeichen enthalten.';
    }
}
