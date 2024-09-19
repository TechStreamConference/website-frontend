<script lang="ts">
	import type { IconLink } from 'types/provideTypes';
	import DummyIcon from 'delete/dummyIcon.svelte';

	const testLinkData: IconLink[] = [
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'web' }
	];
</script>

<div class="link-wrapper">
	{#each testLinkData as link}
		<DummyIcon linkType={link} />
	{/each}
</div>

<style>
	.link-wrapper {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 2rem 0;
		justify-items: center;
	}

	@media (max-width: 1280px) {
		.link-wrapper {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
