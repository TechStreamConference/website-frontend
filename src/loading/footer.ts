import type {Globals} from "@/types/provideTypes";
import type {LoadFooter} from "@/types/loadTypes";

import {get_globals} from "@/stores/globals";
import {has_roles} from "@/stores/roles";

export async function load_footer() : Promise<LoadFooter> {
    const globals:Promise<Globals> = get_globals();
    const logged_in = has_roles();
    return {
        loggedIn: logged_in,
        globals: await globals
    };
}
