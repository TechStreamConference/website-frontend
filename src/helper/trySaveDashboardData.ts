import { resetUnsavedChanges } from "stores/saved";
import { apiUrl } from "./links";
import { SaveMessageType } from "types/saveMessageType";

export async function trySaveDashboardDataAsync<T>(data: T, url: string, routeType: string = 'PUT'): Promise<SaveMessageType> {
    if (import.meta.env.DEV) {
        console.log(data);
    }

    const response: Response = await fetch(apiUrl(url), {
        method: routeType,
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
