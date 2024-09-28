<script lang="ts">
	import type { IconLinks } from 'types/provideTypes';
	import Icon from 'elements/image/icon.svelte';

	export let person: string;

	const testLinkData: IconLinks = [
		{ link: 'https://www.google.de', name: 'Web' },
		{ link: 'https://www.google.de', name: 'Twitch' },
		{ link: 'https://www.google.de', name: 'Discord' },
		{ link: 'https://www.google.de', name: 'LinkedIn' },
		{ link: 'https://www.google.de', name: 'YouTube' },
		{ link: 'https://www.google.de', name: 'Instagram' },
		{ link: 'https://www.google.de', name: 'X' },
		{ link: 'https://www.google.de', name: 'Git' },
		{ link: 'https://www.google.de', name: 'Mail' },
		{ link: 'https://www.google.de', name: 'Download' },
		{ link: 'https://www.google.de', name: 'Calender' },
	];
</script>

<div class="link-wrapper">
	{#each testLinkData as link}
		<Icon linkType={link} {person} on:click />
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
