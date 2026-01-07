import {apiUrl} from "helper/links";
import {SaveMessageType} from "types/saveMessageType";

export async function copyLastApprovedSpeakerEntryAsync(fetch: typeof globalThis.fetch): Promise<Boolean> {
    const response = await fetch(apiUrl('/dashboard/speaker/copy-latest-approved-speaker-entry'), {method: 'POST'});
    if (response.ok) {
        window.location.reload();
        return true;
    }

    return false;
}
