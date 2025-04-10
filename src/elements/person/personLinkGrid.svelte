<script lang="ts">
    import type { SocialMediaLinks } from 'types/provideTypes';

    import StyledLink from 'elements/input/styledLink.svelte';

    export let classes: string = '';

    export let person: string;
    export let links: SocialMediaLinks;
</script>

<div class={classes}>
    {#each links as link}
        <StyledLink
              classes="transparent-background"
              iconClasses="text-color-only"
              href={link.url}
              icon={link.name}
              title="Klicke für {link.name} von {person}"
              on:click
        />
    {/each}
</div>

<style>
    div {
        display:               grid;
        grid-template-columns: repeat(4, 1fr);
        gap:                   var(--full-gap) 0;
        justify-items:         center;
    }
</style>
