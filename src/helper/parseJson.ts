import type Joi from "joi";

export async function parseProvidedJsonAsync<T>(response: Response, scheme: Joi.Schema<T>): Promise<T> {
    const type: T = await response.json();
    const { error } = scheme.validate(type);

    if (error) {
        console.error(error);
        console.log("Validation-Original:", error._original);
        console.log("Validation-Details:", error.details);
    }

    return type;
}
