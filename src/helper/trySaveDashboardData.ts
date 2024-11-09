import { resetUnsavedChanges } from "stores/saved";
import { apiUrl } from "./links";
import { SaveMessageType } from "types/saveMessageType";

export async function trySaveDashboardDataAsync<T>(data: T, url: string): Promise<SaveMessageType> {
    const response: Response = await fetch(apiUrl(url), {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    if (response.ok) {
        resetUnsavedChanges();
        return SaveMessageType.Save;
    }

    if (import.meta.env.DEV) {
        console.error(await response.json());
    }

    return SaveMessageType.Error;
}
