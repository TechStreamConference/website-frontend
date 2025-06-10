import type {Writable} from "svelte/store";
import type {DashboardRoles} from "@/types/dashboardProvideTypes";

import {api_url} from "@/helper/links";
import {writable, get} from "svelte/store";
import {check_and_parse_input_data} from "@/helper/parseJson";
import {dashboard_roles_scheme} from "@/types/dashboardProvideTypes";
import {redirect} from "@/helper/routing";

type ValueType = DashboardRoles | undefined;
const _roles: Writable<ValueType> = writable(undefined);
let timer: undefined | number = undefined;

async function fetch_roles(): Promise<ValueType> {
    const response = await fetch(api_url('/account/roles'));
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

    reset_roles();
    _roles.set(roles);
    setTimeout(fetch_roles, 600000); // ca. 10 Min

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

export async function roles_checked(): Promise<DashboardRoles> {
    const roles_ = await roles();

    if (roles_) {
        return roles_;
    }

    console.log("REDIRECT TO 406");
    await redirect("/");
}

export function reset_roles() {
    _roles.set(undefined);

    clearTimeout(timer);
    timer = undefined;
}
