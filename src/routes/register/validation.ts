import { apiUrl } from "helper/links";
import Joi, { options } from "joi";
import { parseProvidingJson } from "helper/parseJson";

const tlds: string[] = [
    'com', 'org', 'net', 'info', 'web',
    'us', 'uk', 'ca', 'de', 'fr', 'au', 'jp', 'cn', 'in', 'br', 'ru', 'it', 'es',
    'mx', 'nl', 'se', 'ch', 'no', 'fi', 'hk', 'kr', 'sg', 'za', 'pt', 'dk',
    'ie', 'co', 'cl', 'tw', 'ae',
];

type Data = {
    exists: boolean;
}
const dataScheme: Joi.ObjectSchema = Joi.object({
    exists: Joi.boolean().required(),
})


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

    const response: Response = await fetch(apiUrl('/api/account/username/exists?username=' + trimmed));
    if (!response.ok) {
        console.error('Fehler beim überprüfen des Namen. Fehlercode: ' + response.status);
        return;
    }

    const data: Data = await parseProvidingJson<Data>(response, dataScheme);

    if (data.exists) {
        return 'Der Name  "' + trimmed + '" ist bereits vergeben.';
    }
}

export async function onMailChangedAsync(mail: string, fetch: Function): Promise<string | undefined> {
    const trimmed: string = mail.trim();

    if (trimmed.length === 0) {
        return 'Das Feld "E-Mail" ist leer.';
    }

    const { error } = Joi.string().email({ tlds: { allow: tlds } }).required().validate(trimmed);
    if (error) {
        return "Die angegebene E-Mail-Adresse ist nicht gültig.";
    }

    const response: Response = await fetch(apiUrl('/api/account/email/exists?email=' + trimmed));
    if (!response.ok) {
        console.error('Fehler beim überprüfen der E-Mail. Fehlercode: ' + response.status);
        return;
    }

    const data: Data = await parseProvidingJson<Data>(response, dataScheme);

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

    const hasSpecialCharacter: boolean = /[!@#$%^&*()\-_+=\{};:,<.>§~ ]/.test(trimmed);
    if (!hasSpecialCharacter) {
        return 'Das Passwort muss mindestens ein Sonderzeichen enthalten.';
    }
}
