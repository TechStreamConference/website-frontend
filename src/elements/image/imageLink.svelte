<script lang="ts">
	import type { Image } from 'types/provideTypes';
	import Img from './image.svelte';
	export let image: Image;

	export let classes: string = 'size-default';
</script>

<a
	href={image.url}
	target="_blank"
	rel="noopener noreferrer"
	class={classes}
	title="Klicke hier um zu {image.name} zu navigieren."
	on:click
>
	<Img classes="size-default hover" src={image.image_url} alt={image.description} />
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
