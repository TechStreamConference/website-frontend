<script lang="ts">
    import {theme, set_theme, apply_theme} from '@/helper/theme.ts';
    import {onMount} from "svelte";

    import TextLine from "@/lib/text/TextLine.svelte";
    import Button from "@/lib/interact/Button.svelte";

    onMount(() => {
        apply_theme($theme, false);
    })

    function toggle_theme() {
        $theme === 'dark'
            ? set_theme('light')
            : set_theme('dark');
    }
</script>

<Button buttonSize="small-button" on:click={toggle_theme} aria-label="Toggle theme">
    {#if $theme === 'dark'}
        <TextLine font="sub-headline-font">🌞 Light</TextLine>
    {:else}
        <TextLine font="sub-headline-font" classes="text-line-white">🌙 Dark</TextLine>
    {/if}
</Button>
