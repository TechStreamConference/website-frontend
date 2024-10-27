<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';

	import Link from 'elements/text/link.svelte';
	import Icon from 'elements/image/icon.svelte';

	export let classes:string="";

	export let data: LoadYear;
</script>

<div class="year-event-links-wrapper {classes}">
	<Link
		href={data.year.event.discord_url}
		classes="hover-move white"
		newTab={true}
		title="Klicke hier, um auf den Discord-Server der Tech Stream Conference zu gelangen"
	>
		<div class="year-event-links-entry-wrapper">
			<Icon type="Discord" />
			Sei dabei
		</div>
	</Link>
	<Link
		href={data.year.event.twitch_url}
		classes="hover-move white"
		newTab={true}
		title="Klicke hier, um auf die Twitch-Seite der Tech Stream Conference zu gelangen"
	>
		<div class="year-event-links-entry-wrapper">
			<Icon type="Twitch" />
			Schau zu
		</div>
	</Link>
	<Link
		href={data.year.event.presskit_url}
		classes="hover-move white"
		newTab={true}
		title="Klicke hier, um das Presskit der Tech Stream Conference herunterzuladen"
	>
		<div class="year-event-links-entry-wrapper">
			<Icon type="Download" />
			Presskit
		</div>
	</Link>
</div>

<style>
    .year-event-links-wrapper {
        display: flex;
        gap: var(--full-gap);
        flex-wrap: wrap;
    }

    .year-event-links-entry-wrapper {
        display: flex;
        align-items: center;
        gap: var(--half-gap);
        background-color: var(--primary-color-light);
        padding: var(--quad-padding) var(--full-padding) var(--quad-padding) var(--half-padding);
        border-radius: var(--border-radius);
    }
</style>
