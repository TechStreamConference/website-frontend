import type { ValidationWithMessage } from "types/returnTypes";
import { isSameString } from "helper/string";

export async function onUsernameChangedAsync(username: string, fetch: Function): Promise<ValidationWithMessage> {
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
            message: 'Der Name muss mindestens 3 Zeichen enthalten.',
        };
    }

    if (trimmed.length > 30) {
        return {
            valid: false,
            message: 'Der Name darf maximal 30 Zeichen enthalten.',
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

export async function onMailChangedAsync(mail: string, fetch: Function): Promise<ValidationWithMessage> {
    const trimmed: string = mail.trim();

    if (trimmed.length === 0) {
        return {
            valid: false,
            message: 'Das Feld "E-Mail" ist leer.'
        }
    }

    const valid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
        return {
            valid: false,
            message: "Die angegebene E-Mail ist keine gültige E-Mail."
        }
    }

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
            message: 'Das Password muss mindestens 8 Zeichen enthalten.'
        };
    }

    const hasLowerCase: boolean = /[a-z]/.test(trimmed);
    if (!hasLowerCase) {
        return {
            valid: false,
            message: 'Das Passwort muss mindestens ein kleinen Buchstaben enthalten.'
        }
    }

    const hasUpperCase: boolean = /[A-Z]/.test(trimmed);
    if (!hasUpperCase) {
        return {
            valid: false,
            message: 'Das Passwort muss mindestens ein großen Buchstaben enthalten.'
        }
    }

    const hasNumber: boolean = /[1-9]/.test(trimmed);
    if (!hasNumber) {
        return {
            valid: false,
            message: 'Das Passwort muss mindestens eine Zahl enthalten.'
        }
    }

    const hasSpecialCharacter: boolean = /[!@#$%^&*()\-_+=\{};:,<.>§~ ]/.test(trimmed);
    if (!hasSpecialCharacter) {
        return {
            valid: false,
            message: 'Das Passwort muss mindestens ein Sonderzeichen enthalten.'
        }
    }

    return {
        valid: true,
        message: '',
    };
}
