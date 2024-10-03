<script lang="ts">
	import type { SocialMediaLinks } from 'types/provideTypes';
	import IconLink from 'elements/image/iconLink.svelte';

	export let person: string;
	export let links: SocialMediaLinks;
</script>

<div class="link-wrapper">
	{#each links as link}
		<IconLink linkType={link} title="Klicke für {link.name} von {person}" on:click />
	{/each}
</div>

<style>
	.link-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
		gap: 1rem 0;
		margin: 2rem 0;
		justify-items: center;
	}
</style>
