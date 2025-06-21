<script lang="ts">
    import {isDarkStore, isDark, setTheme} from 'stores/theme';

    import TextLine from "elements/text/textLine.svelte";
    import Button from "elements/input/button.svelte";

    function toggleTheme() {
        setTheme(isDark() ? 'light' : 'dark');
    }
</script>

<Button buttonSize="small-button" on:click={toggleTheme} ariaLabel="Toggle theme">
    {#if $isDarkStore}
        <TextLine>🌞 Light</TextLine>
    {:else}
        <TextLine classes="text-line-white">🌙 Dark</TextLine>
    {/if}
</Button>
