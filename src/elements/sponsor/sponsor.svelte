<script lang="ts">
	import type { SponsorLink } from 'types/provideTypes';
	import {imageUrl} from 'helper/links';
	import Image from 'elements/image/image.svelte';
	export let link: SponsorLink;

	export let classes: string = 'size-default';

	console.log(link.logo);
</script>

<a
	href={link.url}
	target="_blank"
	rel="noopener noreferrer"
	class={classes}
	title="Klicke hier um zu {link.name} zu navigieren."
	on:click
>
	<Image classes="size-default" src={imageUrl(link.logo)} alt={link.alt_text} />
</a>

<style>
	a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.size-default {
		max-height: 100%;
		max-width: 100%;
		height: auto;
		width: auto;
	}
</style>
