import type {Globals} from '@/types/provideTypes';

import {globals_scheme} from '@/types/provideTypes';
import {z, ZodSchema} from 'zod';
import {response_lookup} from '@/lookup/responseLookup';
import {redirect} from "@/helper/routing";

export async function parse_multiple_errors(response: Response): Promise<string[]> {
    try {
        const text: string = await response.text();
        const json: {
            [key: string]: string
        } = JSON.parse(text);
        const values: string[] = Object.values(json);
        const toReturn: string[] = [];
        for (const value of values) {
            toReturn.push(response_lookup(value));
        }
        return toReturn;

    } catch {
        console.error('error while parsing error response');
        console.log(response);
        return [];
    }
}

export async function parse_multiple_infos(response: Response): Promise<{
    [key: string]: string
}> {
    try {
        const text: string = await response.text();
        return await JSON.parse(text);

    } catch {
        return {};
    }
}

export async function parse_provided_json<T extends ZodSchema>(
    response: Response,
    scheme: T,
): Promise<z.infer<T> | undefined> {
    try {
        const type: T = await response.json();
        const validated = await scheme.safeParse(type);

        if (validated.success) {
            return validated.data;
        }

        console.error(validated.error.errors);

    } catch (error) {
        console.error('Error occurred during parse or validation:', error);
    }
}

export async function check_and_parse_input_data<T extends ZodSchema>(
    response: Response,
    scheme: T,
    messageOK: string,
    messageData: string,
): Promise<z.infer<T>> {
    if (!response.ok) {
        console.error(messageOK);
        console.error("REDIRECT TO RESPONSE STATUS");
        await redirect("/");
        // throw error(response.status);
    }

    const data = await parse_provided_json<T>(response, scheme);

    if (!data) {
        console.error(messageData);
        console.error("REDIRECT TO 406");
        await redirect("/");
        // throw error(406);
    }

    return data;
}

export async function check_and_parse_globals(response: Response): Promise<Globals> {
    return await check_and_parse_input_data(
        response,
        globals_scheme,
        `Serveranfrage für globals nicht erfolgreich.`,
        `Unerwartete Daten für globals.`,
    );
}
