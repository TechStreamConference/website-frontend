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
		<DummyIcon linkType={link} on:click/>
	{/each}
</div>

<style>
	.link-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
		gap: 2rem 0;
		justify-items: center;
	}
</style>
