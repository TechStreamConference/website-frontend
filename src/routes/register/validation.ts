import type { ValidationWithMessage } from "types/returnTypes";
import { isSameString } from "helper/string";

export async function onUsernameChanged(username: string, fetch: Function): Promise<ValidationWithMessage> {
    const trimmed: string = username.trim();

    if (trimmed.length === 0) {
        return {
            valid: false,
            message: 'Das Feld "Name" ist leer.',
        };
    }

    if (trimmed.length < 3) {
        return {
            valid: false,
            message: 'Der Name muss mindestens 3 Zeichen haben.',
        };
    }

    if (trimmed.length > 30) {
        return {
            valid: false,
            message: 'Der Name darf maximal 30 Zeichen haben.',
        };
    }

    const response: Response = await fetch('api/account/username/exists?username=' + trimmed);
    if (!response.ok) {
        console.error('Fehler beim überprüfen des Namen. Fehlercode: ' + response.status);
        return {
            valid: false,
            message: '',
        };
    }

    let data: { exists: boolean };
    try {
        data = await response.json();
    } catch (error) {
        console.error('error while parsing username json', error);
        return {
            valid: false,
            message: '',
        };
    }

    if (data.exists) {
        return {
            valid: false,
            message: 'Der Name  "' + trimmed + '" ist bereits vergeben.',
        };
    }

    return {
        valid: true,
        message: '',
    };
}

export async function onMailChanged(mail: string, fetch: Function): Promise<ValidationWithMessage> {
    const trimmed: string = mail.trim();

    if (trimmed.length === 0) {
        return {
            valid: false,
            message: 'Das Feld "E-Mail" ist leer.'
        }
    }

    // TODO: check for valid email

    const response: Response = await fetch('api/account/email/exists?email=' + trimmed);
    if (!response.ok) {
        console.error('Fehler beim überprüfen der E-Mail. Fehlercode: ' + response.status);
        return {
            valid: false,
            message: '',
        };
    }

    let data: { exists: boolean };
    try {
        data = await response.json();
    } catch (error) {
        console.error('error while parsing email json', error);
        return {
            valid: false,
            message: '',
        };
    }

    if (data.exists) {
        return {
            valid: false,
            message: 'Die E-Mail "' + trimmed + '" wird bereits verwendet.',
        }
    }

    return {
        valid: true,
        message: '',
    };
}

export function onPasswordChanged(password_1: string, password_2: string): ValidationWithMessage {
    const trimmed: string = password_1.trim();

    if (trimmed.length === 0) {
        return {
            valid: false,
            message: 'Das Feld "Passwort" ist leer.',
        };
    }

    if (password_2.trim().length === 0) {
        return {
            valid: false,
            message: 'Das Feld "Passwort wiederholen" ist leer.',
        };
    }

    if (!isSameString(trimmed, password_2)) {
        return {
            valid: false,
            message: 'Die Passwörter stimmen nicht überein.',
        };
    }

    if (trimmed.length < 8) {
        return {
            valid: false,
            message: 'Das Password muss mindestens 3 Zeichen haben.'
        };
    }

    // TODO: Check for valid password

    return {
        valid: true,
        message: '',
    };
}