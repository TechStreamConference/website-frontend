import { defaultPermissionCheck } from "helper/dashboardNavigatin";
import type { Roles } from "types/provideTypes";

export async function load({ fetch }: { fetch: typeof globalThis.fetch }): Promise<void> {
    // call
    const rolesPromise: Promise<Roles> = defaultPermissionCheck(fetch);

    // data
    await rolesPromise; // just to make sure the async function is fully executed
}
