<script lang="ts">
	import type { IconLink } from 'types/provideTypes';
	import DummyIcon from 'elements/image/icon.svelte';

	const testLinkData: IconLink[] = [
		{ link: 'https://www.google.de', type: 'web' },
		{ link: 'https://www.google.de', type: 'twitch' },
		{ link: 'https://www.google.de', type: 'discord' },
		{ link: 'https://www.google.de', type: 'linkedin' },
		{ link: 'https://www.google.de', type: 'youtube' },
		{ link: 'https://www.google.de', type: 'instagram' },
		{ link: 'https://www.google.de', type: 'x' },
		{ link: 'https://www.google.de', type: 'git' },
		{ link: 'https://www.google.de', type: 'mail' },
		{ link: 'https://www.google.de', type: 'download' },
		{ link: 'https://www.google.de', type: 'calender' },
	];
</script>

<div class="link-wrapper">
	{#each testLinkData as link}
		<DummyIcon linkType={link} on:click />
	{/each}
</div>

<style>
	.link-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
		gap: 1rem 0;
		justify-items: center;
	}
</style>
