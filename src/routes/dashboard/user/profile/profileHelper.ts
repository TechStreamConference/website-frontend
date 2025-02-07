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


export function censorEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) {
        return email;
    }

    const censoredLocal = localPart.length >= 2 ? localPart[0] + '***' + localPart[localPart.length - 1] : localPart;

    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
        return email;
    }
    const domainName = domainParts.slice(0, domainParts.length - 1).join('.');
    const tld        = domainParts[domainParts.length - 1];

    const censoredDomain = domainName.length >= 2
                           ? domainName[0] + '***' + domainName[domainName.length - 1]
                           : domainName;

    return `${censoredLocal}@${censoredDomain}.${tld}`;
}
