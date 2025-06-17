<script lang="ts">
    import {isDarkStore, isDark, setTheme} from 'stores/theme';

    import TextLine from "elements/text/textLine.svelte";
    import Button from "elements/input/button.svelte";

    function toggleTheme() {
        setTheme(isDark() ? 'light' : 'dark');
    }
</script>

<Button buttonSize="small-button" on:click={toggleTheme} aria-label="Toggle theme">
    {#if $isDarkStore}
        <TextLine font="sub-headline-font">🌞 Light</TextLine>
    {:else}
        <TextLine font="sub-headline-font" classes="text-line-white">🌙 Dark</TextLine>
    {/if}
</Button>
