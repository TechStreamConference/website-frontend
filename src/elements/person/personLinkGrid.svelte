<script lang="ts">
	import type { SocialMediaLinks } from 'types/provideTypes';

	import IconLink from 'elements/image/iconLink.svelte';

	export let classes:string = "";

	export let person: string;
	export let links: SocialMediaLinks;
</script>

<div class={classes}>
	{#each links as link}
		<IconLink linkType={link} title="Klicke für {link.name} von {person}" on:click />
	{/each}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
        gap: var(--full-gap) 0;
        padding: var(--4x-margin) 0;
        justify-items: center;
    }
</style>
