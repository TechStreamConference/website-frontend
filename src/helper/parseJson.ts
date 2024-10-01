import type { ZodType } from "zod";

export async function parseProvidedJsonAsync<T>(response: Response, scheme: ZodType<T>): Promise<T | undefined> {
    try {
        const type : T = await response.json();
        const validated = scheme.safeParse(type);

        if (validated.success) {
            return validated.data;
        }

        console.error(validated.error.errors);
        console.log("Validation-Original:", type);

        return type;

    } catch (error) {
        console.error('Error occurred during fetch or validation:', error);
    }
}
