<script lang="ts">
	import type { SponsorLinks } from 'types/provideTypes';
	export let logos: SponsorLinks;
	import Sponsor from 'elements/sponsor/sponsor.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<div class="image-grid">
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
		gap: 3rem;
	}

	.image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.image-container :global(.link) {
		height: 10rem;
	}

	@media (max-width: 600px) {
		.image-grid {
			gap: 2rem;
		}
	}
</style>
