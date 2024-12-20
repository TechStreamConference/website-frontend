import { error } from "@sveltejs/kit";
import { globalsScheme, type Globals } from "types/provideTypes";
import type { ZodType } from "zod";

export async function parseProvidedJsonAsync<T>(response: Response, scheme: ZodType<T>): Promise<T | undefined> {
    try {
        const type: T = await response.json();
        if (import.meta.env.DEV) {
            console.log(type);
        }
        const validated = scheme.safeParse(type);

        if (validated.success) {
            return validated.data;
        }

        console.error(validated.error.errors);
        console.log("Validation-Original:", type);

    } catch (error) {
        console.error('Error occurred during parse or validation:', error);
    }
}

export async function checkAndParseInputDataAsync<T>(response: Response, scheme: ZodType<T>, messageOK: string, messageData: string): Promise<T> {
    if (!response.ok) {
        console.error(messageOK);
        throw error(406);
    }

    const data = await parseProvidedJsonAsync<T>(response, scheme);

    if (!data) {
        console.error(messageData);
        throw error(406);
    }

    return data;
}

export async function checkAndParseGlobalsAsync(response: Response): Promise<Globals> {
    return await checkAndParseInputDataAsync<Globals>(
        response,
        globalsScheme,
        `Serveranfrage für globals nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für globals. throw error(406)`
    );
}
