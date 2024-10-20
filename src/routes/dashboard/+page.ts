import { defaultNavigation, defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<void> {
    const roles: Roles = await defaultPermissionCheck(fetch);
    defaultNavigation(roles);
}
