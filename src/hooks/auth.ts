import type {RouteResult} from "@mateothegreat/svelte5-router";
import {goto} from "@mateothegreat/svelte5-router"
import {imprint_item} from "@/config/MenuItem";

export const dashboard_auth = async (route: RouteResult) : Promise<boolean> => {
    const logged_in = await fetch('http://localhost/api/account/roles');
    if (logged_in.ok) {
        return true;
    }

    // @todo: use login page here with flag
    goto(imprint_item.path);
    return false;
}
