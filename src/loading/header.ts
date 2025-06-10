import {has_roles} from "@/stores/roles";

export function load_header() : boolean {
    return has_roles();
}
