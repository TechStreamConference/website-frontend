<script lang="ts">
    import {theme, set_theme, apply_theme} from '@/helper/theme.ts';
    import {onMount} from "svelte";

    import TextLine from "@/lib/text/TextLine.svelte";
    import Button from "@/lib/interact/Button.svelte";

    onMount(() => {
        apply_theme($theme);
    })

    function toggle_theme() {
        $theme === 'dark'
            ? set_theme('light')
            : set_theme('dark');
    }
</script>

<Button class="hover-move" buttonSize="small-button" on:click={toggle_theme} aria-label="Toggle theme">
    {#if $theme === 'dark'}
        <TextLine>🌞 Light</TextLine>
    {:else}
        <TextLine classes="text-line-white">🌙 Dark</TextLine>
    {/if}
</Button>
