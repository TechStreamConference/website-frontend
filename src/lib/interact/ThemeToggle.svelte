<script lang="ts">
    import {theme, setTheme, applyTheme} from '@/helper/theme.ts';
    import {onMount} from "svelte";

    onMount(() => {
        applyTheme($theme);
    })

    function toggleTheme() {
        $theme === 'dark'
            ? setTheme('light')
            : setTheme('dark');
    }
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
    {#if $theme === 'dark'}
        🌞 Light
    {:else}
        🌙 Dark
    {/if}
</button>

<style>
    button {
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--text-color);
        background: var(--background-color);
        color: var(--text-color);
        cursor: pointer;
        transition: all var(--transition-duration);
    }

    button:hover {
        background: var(--background-color-light);
    }
</style>
