<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';

	import LinkWithIcon from './linkWithIcon.svelte';

	export let classes: string = '';

	export let data: LoadYear;
</script>

<div class="year-event-links-wrapper {classes}">
	<LinkWithIcon
		href={data.year.event.discord_url}
		title="Klicke hier, um auf den Discord-Server der Tech Stream Conference zu gelangen"
		icon="Discord"
	>
		Sei dabei
	</LinkWithIcon>
	<LinkWithIcon
		href={data.year.event.twitch_url}
		title="Klicke hier, um auf die Twitch-Seite der Tech Stream Conference zu gelangen"
		icon="Twitch"
	>
		Schau zu
	</LinkWithIcon>
	<LinkWithIcon
		href={data.year.event.presskit_url}
		title="Klicke hier, um das Presskit der Tech Stream Conference herunterzuladen"
		icon="Download"
	>
		Presskit
	</LinkWithIcon>
</div>

<style>
	.year-event-links-wrapper {
		display: flex;
		gap: var(--full-gap);
		flex-wrap: wrap;
	}
</style>
