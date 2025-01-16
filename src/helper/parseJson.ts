import { error } from '@sveltejs/kit';
import { globalsScheme, type Globals } from 'types/provideTypes';
import { z, ZodSchema } from 'zod';
import { responseLookup } from 'lookup/responseLookup';

export async function parseMultipleErrorsAsync(response: Response): Promise<string[]> {
    try {
        const text: string       = await response.text();
        const json: {
            [key: string]: string
        }                        = JSON.parse(text);
        const values: string[]   = Object.values(json);
        const toReturn: string[] = [];
        for (const value of values) {
            toReturn.push(responseLookup(value));
        }
        return toReturn;

    } catch {
        console.error('error while parsing error response');
        console.log(response);
        return [];
    }
}

export async function parseProvidedJsonAsync<T extends ZodSchema>(
    response: Response,
    scheme: T,
): Promise<z.infer<T> | undefined> {
    try {
        const type: T   = await response.json();
        const validated = scheme.safeParse(type);

        if (validated.success) {
            return validated.data;
        }

        console.error(validated.error.errors);

    } catch (error) {
        console.error('Error occurred during parse or validation:', error);
    }
}

export async function checkAndParseInputDataAsync<T extends ZodSchema>(
    response: Response,
    scheme: T,
    messageOK: string,
    messageData: string,
): Promise<z.infer<T>> {
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
    return await checkAndParseInputDataAsync(
        response,
        globalsScheme,
        `Serveranfrage für globals nicht erfolgreich. throw error(406)`,
        `Unerwartete Daten für globals. throw error(406)`,
    );
}
