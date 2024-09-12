import { writable } from "svelte/store";

export const loginStatus = writable<boolean | null>(null);
