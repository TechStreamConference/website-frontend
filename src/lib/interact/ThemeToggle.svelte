<script lang="ts">
    import {theme, setTheme, applyTheme} from '@/helper/theme.ts';
    import {onMount} from "svelte";

    import TextLine from "@/lib/text/TextLine.svelte";
    import Button from "@/lib/interact/Button.svelte";

    onMount(() => {
        applyTheme($theme);
    })

    function toggleTheme() {
        $theme === 'dark'
            ? setTheme('light')
            : setTheme('dark');
    }
</script>

<Button class="hover-move" buttonSize="small-button" on:click={toggleTheme} aria-label="Toggle theme">
    {#if $theme === 'dark'}
        <TextLine>🌞 Light</TextLine>
    {:else}
        <TextLine classes="text-line-white">🌙 Dark</TextLine>
    {/if}
</Button>
