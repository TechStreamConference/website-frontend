import { resetUnsavedChanges } from 'stores/saved';
import { apiUrl } from './links';
import { SaveMessageType } from 'types/saveMessageType';
import { parseMultipleErrorsAsync } from 'helper/parseJson';

export type SaveDashboardResult = {
    success: boolean;
    messages: string[];
}

export function combineSaveDashboardData(lhs: SaveDashboardResult, rhs: SaveDashboardResult): SaveDashboardResult {
    return {
        success:  lhs.success && rhs.success,
        messages: [
            ...lhs.messages,
            ...rhs.messages,
        ],
    };
}

export async function trySaveDashboardDataAsyncOld<T>(
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

export async function trySaveDashboardDataAsyncOutReset<T>(
    data: T,
    url: string,
    routeType: string,
): Promise<SaveDashboardResult> {
    const response: Response = await fetch(apiUrl(url), {
        method: routeType,
        body:   JSON.stringify(data),
    });

    return {
        success:  response.ok,
        messages: response.ok ? [] : await parseMultipleErrorsAsync(response),
    };
}


export async function trySaveDashboardDataAsync<T>(
    data: T,
    url: string,
    routeType: string,
): Promise<SaveDashboardResult> {
    const result = await trySaveDashboardDataAsyncOutReset(data, url, routeType);

    if (result.success) {
        resetUnsavedChanges();
    }

    return result;
}
