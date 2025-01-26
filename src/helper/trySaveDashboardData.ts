import { resetUnsavedChanges } from 'stores/saved';
import { apiUrl } from './links';
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

export async function trySaveDashboardDataAsyncOutReset<T>(
    data: T,
    url: string,
    routeType: string,
): Promise<SaveDashboardResult> {
    const stringData = data instanceof FormData ? data : JSON.stringify(data);
    const response: Response = await fetch(apiUrl(url), {
        method: routeType,
        body:   stringData,
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
