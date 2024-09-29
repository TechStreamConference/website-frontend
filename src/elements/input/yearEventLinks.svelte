<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';

	import Link from 'elements/text/link.svelte';
	import Icon from 'elements/image/icon.svelte';

	export let data: LoadYear;
</script>

<div class="wrapper">
	<Link
		href={data.year.event.discord_url}
		classes="animated white"
		title="Klicke hier, um auf den Discord-Server der Tech Stream Conference zu gelangen"
	>
		<div class="entry-wrapper"><Icon type="Discord" />Sei dabei</div>
	</Link>
	<Link
		href={data.year.event.twitch_url}
		classes="animated white"
		title="Klicke hier, um auf die Twitch-Seite der Tech Stream Conference zu gelangen"
	>
		<div class="entry-wrapper"><Icon type="Twitch" />Schau zu</div>
	</Link>
	<Link
		href={data.year.event.presskit_url}
		classes="animated white"
		title="Klicke hier, um das Presskit der Tech Stream Conference herunterzuladen"
	>
		<div class="entry-wrapper"><Icon type="Download" />Presskit</div>
	</Link>
</div>

<style>
	.wrapper {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.entry-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--primary-color);
		padding: 0.1rem 0.5rem 0.1rem 0.3rem;
		border-radius: var(--border-radius);
	}
</style>
