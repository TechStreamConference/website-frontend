import type { LoadDashboard } from 'types/dashboardLoadTypes';
import type { DashboardRoles } from 'types/dashboardProvideTypes';
import type { Globals } from 'types/provideTypes';

import {
    defaultNavigation,
    defaultPermissionCheck,
} from 'helper/dashboardNavigation';
import { apiUrl } from 'helper/links';
import { checkAndParseGlobalsAsync } from 'helper/parseJson';

export async function load({
                               url,
                               fetch,
                           }: {
    url: URL,
    fetch: typeof globalThis.fetch
}): Promise<LoadDashboard> {
    // call
    const rolesPromise: Promise<DashboardRoles> = defaultPermissionCheck(fetch);
    const globalsPromise: Promise<Response>     = fetch(apiUrl('/api/globals'));

    // data
    const roles: DashboardRoles = await rolesPromise;
    const globals: Globals      = await checkAndParseGlobalsAsync(await globalsPromise);

    const name: string = url.pathname.substring(url.pathname.lastIndexOf('/'));
    if ((name === '/dashboard') || (name === '/admin') || (name === '/team-member') || (name === '/speaker')) {
        defaultNavigation(roles);
    }

    if ((url.pathname.includes('/admin') && !roles.is_admin) || (url.pathname.includes('/team-member')
                                                                 && !roles.is_team_member) || (url.pathname.includes(
        '/speaker') && !roles.is_speaker)) {
        defaultNavigation(roles);
    }

    return {
        roles,
        globals,
    };
}
