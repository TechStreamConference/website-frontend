import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'system';

// Get the initial theme from localStorage or default to 'system'
const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as Theme) || 'system';
};

export const theme = writable<Theme>(getInitialTheme());

// Update theme and save to localStorage
export const setTheme = (newTheme: Theme) => {
    theme.set(newTheme);
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
    }
    applyTheme(newTheme);
};

// Apply theme to document
export const applyTheme = (currentTheme: Theme, withTransition: boolean = true) => {
    if (typeof window === 'undefined') return;

    const isDark =
        currentTheme === 'dark' ||
        (currentTheme === 'system' &&
         window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (withTransition) {
        // Add a transition class
        document.documentElement.classList.add('theme-transition');

        // Remove it after the transition is complete
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300); // Match your transition duration
    }


    document.documentElement.classList.toggle('dark-theme', isDark);
};

// Listen for system theme changes
if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
            theme.subscribe(currentTheme => {
                if (currentTheme === 'system') {
                    applyTheme('system');
                }
            });
        });
}
