import { resetUnsavedChanges } from 'stores/saved';
import { apiUrl } from './links';
import { SaveMessageType } from 'types/saveMessageType';
import { parseMultipleErrorsAsync } from 'helper/parseJson';

export type SaveDashboardResult = {
    success: boolean;
    messages: string[];
}

export async function trySaveDashboardDataAsync<T>(
    data: T,
    url: string,
    routeType: string = 'PUT',
): Promise<SaveMessageType> {
    const response: Response = await fetch(apiUrl(url), {
        method: routeType,
        body:   JSON.stringify(data),
    });

    if (response.ok) {
        resetUnsavedChanges();
        return SaveMessageType.Save;
    }

    return SaveMessageType.Error;
}

// this will replace the old function over time
export async function trySaveDashboardDataAsyncNew<T>(
    data: T,
    url: string,
    routeType: string,
): Promise<SaveDashboardResult> {
    const response: Response = await fetch(apiUrl(url), {
        method: routeType,
        body:   JSON.stringify(data),
    });

    if (response.ok) {
        resetUnsavedChanges();
        return {
            success:  true,
            messages: [],
        };
    }

    return {
        success:  false,
        messages: await parseMultipleErrorsAsync(response),
    };
}
