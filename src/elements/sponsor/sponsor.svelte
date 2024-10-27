<script lang="ts">
	import type { SponsorLink } from 'types/provideTypes';
	import { imageUrl } from 'helper/links';
	import Image from 'elements/image/image.svelte';
	export let link: SponsorLink;

	export let classes: string = 'size-default';
</script>

<a
	href={link.url}
	target="_blank"
	rel="noopener noreferrer"
	class="sponsor-link {classes}"
	title="Klicke hier um zu {link.name} zu navigieren."
	on:click
>
	<Image classes="size-default hover" src={imageUrl(link.logo)} alt={link.alt_text} />
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

	.sponsor-link :global(.hover) {
		padding: var(--quad-padding);
		transition: padding var(--transition-duration);
	}

	.sponsor-link :global(.hover:hover) {
		padding: 0;
		transition: padding var(--transition-duration);
	}

	.sponsor-link :global(.hover:active) {
		padding: var(--quad-padding);
		transition: padding var(--transition-duration);
	}

	@media (max-width: 1280px) {
		.sponsor-link :global(.hover) {
			padding: var(--quad-padding);
		}

		.sponsor-link :global(.hover:hover) {
			padding: var(--quad-padding);
		}

		.sponsor-link :global(.hover:active) {
			padding: var(--quad-padding);
		}
	}
</style>
