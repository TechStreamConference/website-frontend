import type {Writable} from "svelte/store";
import {get, writable} from "svelte/store";
import {createPersistentStore} from "stores/persistantStore";
import {browser} from "$app/environment";

type Theme = "system" | "light" | "dark";

const THEME_STORAGE_KEY = 'TEST_CONF_THEME';
const THEME_TRANSITION_DURATION = 300;
const DEFAULT_THEME: Theme = "system";


function initializeTheme(): Writable<Theme> {
    const _theme = createPersistentStore<Theme>(THEME_STORAGE_KEY, DEFAULT_THEME);
    isDarkStore.set(calculateIsDarkLocal(_theme));
    updateTheme();
    return _theme;
}

export const isDarkStore = writable<boolean>(true);
const _theme = initializeTheme();

function calculateIsDarkLocal(store: Writable<Theme> = _theme): boolean {
    if (!browser) {
        return true;
    }
    return get(store) === "dark" || (get(store) === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function updateTheme() {
    if (!browser) {
        return;
    }

    document.documentElement.classList.toggle("dark-theme", get(isDarkStore));
}

function applyTransition() {
    if (!browser) {
        return;
    }
    document.documentElement.classList.add("theme-transition");

    setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
        }, THEME_TRANSITION_DURATION
    );
}

export function setTheme(theme: Theme, withTransition: boolean = true) {
    _theme.set(theme);
    isDarkStore.set(calculateIsDarkLocal());

    if (withTransition) {
        applyTransition();
    }

    updateTheme();
}


export function isDark(): boolean {
    return get(isDarkStore);
}

export function isLight(): boolean {
    return !isDark();
}
