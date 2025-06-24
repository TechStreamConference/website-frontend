import type {Globals} from 'types/provideTypes';

import {error} from '@sveltejs/kit';
import {globalsScheme} from 'types/provideTypes';
import {z, ZodSchema} from 'zod';
import {responseLookup} from 'lookup/responseLookup';
import {browser} from "$app/environment";
import {env} from '$env/dynamic/public';

export async function parseMultipleErrorsAsync(response: Response): Promise<string[]> {
    try {
        const text: string = await response.text();
        const json: {
            [key: string]: string
        } = JSON.parse(text);
        const values: string[] = Object.values(json);
        const toReturn: string[] = [];
        for (const value of values) {
            toReturn.push(responseLookup(value));
        }


        if (!browser && env.PUBLIC_PRINT_FETCH_IN_SERVER === "true") {
            console.log("parseMultipleErrorsAsync:");
            console.log(toReturn);
        }

        return toReturn;

    } catch {
        console.error('error while parsing error response');
        console.log(response);
        return [];
    }
}

export async function parseMultipleInfosAsync(response: Response): Promise<{
    [key: string]: string
}> {
    try {
        const text: string = await response.text();
        const toReturn = await JSON.parse(text);

        if (!browser && env.PUBLIC_PRINT_FETCH_IN_SERVER === "true") {
            console.log("parseMultipleInfosAsync:");
            console.log(toReturn);
        }

        return toReturn;

    } catch {
        return {};
    }
}

export async function parseProvidedJsonAsync<T extends ZodSchema>(
    response: Response,
    scheme: T,
): Promise<z.infer<T> | undefined> {
    try {
        const type: T = await response.json();
        const validated = scheme.safeParse(type);

        if (validated.success) {

            if (!browser && env.PUBLIC_PRINT_FETCH_IN_SERVER === "true") {
                console.log("parseProvidedJsonAsync:");
                console.log(validated.data);
            }

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
        throw error(response.status);
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
        `Serveranfrage für globals nicht erfolgreich.`,
        `Unerwartete Daten für globals.`,
    );
}
