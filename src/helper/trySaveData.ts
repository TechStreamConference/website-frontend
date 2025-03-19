import { resetUnsavedChanges } from 'stores/saved';
import { apiUrl } from './links';
import { parseMultipleErrorsAsync, parseMultipleInfosAsync } from 'helper/parseJson';

export type SaveResult = {
    success: boolean;
    messages: string[];
    infos: {
        [key: string]: string
    };
}

export function combineSaveResult(lhs: SaveResult, rhs: SaveResult): SaveResult {
    return {
        success:  lhs.success && rhs.success,
        messages: [
            ...lhs.messages,
            ...rhs.messages,
        ],
        infos:    {
            ...lhs.infos, ...rhs.infos,
        },
    };
}

export async function trySaveDataAsyncOutReset<T>(
    fetch: typeof globalThis.fetch,
    data: T,
    url: string,
    routeType: string,
): Promise<SaveResult> {
    const stringData         = data instanceof FormData ? data : JSON.stringify(data);
    const response: Response = await fetch(apiUrl(url), {
        method: routeType,
        body:   stringData,
    });

    return {
        success:  response.ok,
        messages: response.ok ? [] : await parseMultipleErrorsAsync(response),
        infos:    await parseMultipleInfosAsync(response),
    };
}


export async function trySaveDataAsync<T>(
    fetch: typeof globalThis.fetch,
    data: T,
    url: string,
    routeType: string,
): Promise<SaveResult> {
    const result = await trySaveDataAsyncOutReset(fetch, data, url, routeType);

    if (result.success) {
        resetUnsavedChanges();
    }

    return result;
}
