<script lang="ts">
	import type { IconLink } from 'types/provideTypes';
	import DummyIcon from 'elements/image/icon.svelte';

	export let person: string;

	const testLinkData: IconLink[] = [
		{ link: 'https://www.google.de', type: 'Web' },
		{ link: 'https://www.google.de', type: 'Twitch' },
		{ link: 'https://www.google.de', type: 'Discord' },
		{ link: 'https://www.google.de', type: 'LinkedIn' },
		{ link: 'https://www.google.de', type: 'YouTube' },
		{ link: 'https://www.google.de', type: 'Instagram' },
		{ link: 'https://www.google.de', type: 'X' },
		{ link: 'https://www.google.de', type: 'Git' },
		{ link: 'https://www.google.de', type: 'Mail' },
		{ link: 'https://www.google.de', type: 'Download' },
		{ link: 'https://www.google.de', type: 'Calender' },
	];
</script>

<div class="link-wrapper">
	{#each testLinkData as link}
		<DummyIcon linkType={link} {person} on:click />
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
