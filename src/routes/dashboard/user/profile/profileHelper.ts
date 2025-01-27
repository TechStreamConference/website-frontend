import type { DashboardUserData } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardUserDataScheme } from 'types/dashboardProvideTypes';

export async function loadUserData(fetch: typeof globalThis.fetch): Promise<DashboardUserData> {
    const userDataFetchPromise = fetch(apiUrl('/api/account'));

    return await checkAndParseInputDataAsync(
        await userDataFetchPromise,
        dashboardUserDataScheme,
        'Serveranfrage für User Data war nicht erfolgreich.',
        'Unerwartete Daten für User Data.',
    );
}
