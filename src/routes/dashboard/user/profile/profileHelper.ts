import type { DashboardRoles } from 'types/dashboardProvideTypes';

import { apiUrl } from 'helper/links';
import { checkAndParseInputDataAsync } from 'helper/parseJson';
import { dashboardRolesScheme } from 'types/dashboardProvideTypes';

export async function loadUserData(fetch: typeof globalThis.fetch): Promise<DashboardRoles> {
    const userDataFetchPromise = fetch(apiUrl('/api/account/roles'));

    return await checkAndParseInputDataAsync(
        await userDataFetchPromise,
        dashboardRolesScheme,
        'Serveranfrage für User Data war nicht erfolgreich.',
        'Unerwartete Daten für User Data.',
    );
}
