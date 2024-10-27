<script lang="ts">
	import type { SponsorLinks } from 'types/provideTypes';
	export let logos: SponsorLinks;
	import Sponsor from 'elements/sponsor/sponsor.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<div class="image-grid sponsor-array">
	{#each logos as logo}
		<div class="image-container">
			<Sponsor link={logo} classes={'link'} />
			{#if logo.copyright}
				<TextLine>{logo.copyright}</TextLine>
			{/if}
		</div>
	{/each}
</div>

<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
		gap: var(--2x-gap);
	}

	.image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.sponsor-array :global(.link) {
		height: 10rem;
	}
</style>
