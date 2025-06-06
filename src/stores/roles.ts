import type {Writable} from "svelte/store";
import type {DashboardRoles} from "@/types/dashboardProvideTypes";

import {api_url} from "@/helper/links";
import {writable, get} from "svelte/store";
import {check_and_parse_input_data} from "@/helper/parseJson";
import {dashboard_roles_scheme} from "@/types/dashboardProvideTypes";
import {reset_globals} from "@/stores/globals";
import {redirect} from "@/helper/routing";

type ValueType = DashboardRoles | undefined;
const _roles: Writable<ValueType> = writable(undefined);
let timer: undefined | number = undefined;

async function fetch_roles(): Promise<ValueType> {
    const response = await fetch(api_url('/roles'));
    if (!response.ok) {
        _roles.set(undefined);
        return undefined;
    }

    const roles: DashboardRoles = await check_and_parse_input_data(
        response,
        dashboard_roles_scheme,
        "Serveranfrage für doe Dashboard-Rollen nicht erfolgreich.",
        "Unerwartete Daten für die Dashboard-Rollen."
    );

    reset_globals();
    _roles.set(roles);
    setTimeout(reset_globals, 600000); // ca. 10 Min

    return roles;
}

export function has_roles(): boolean {
    return get(_roles) !== undefined;
}

export async function roles(): Promise<ValueType> {
    if (has_roles()) {
        return get(_roles);
    }

    return await fetch_roles();
}

export async function roled_checked(): Promise<DashboardRoles> {
    const roles = await roles();

    if (!roles) {
        console.log("REDIRECT TO 406");
        await redirect("/");
    }

    return roles;
}

export function reset_roles() {
    _roles.set(undefined);

    clearTimeout(timer);
    timer = undefined;
}
