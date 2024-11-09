<script lang="ts">
	import type { Menu } from 'types/provideTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import UnsavedChangesPopup from 'elements/navigation/unsavedChangesPopup.svelte';

	export let unsavedChangesPopup: UnsavedChangesPopup;

	const tabsEntries: Menu = [
		{
			name: 'Globals',
			url: '/dashboard/admin/globals',
			description: 'Klicke hier, um zu den globalen Einstellungen im Admin-Dashboard zu gelangen.'
		},
		{
			name: 'Events',
			url: '/dashboard/admin/events',
			description: 'Klicke hier, um zu den Event Einstellungen zu gelangen.'
		}
	];
</script>

<div class="dashboard-admin">
	<Headline classes="headline-border">Admin</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot {unsavedChangesPopup} />

<style>
	.dashboard-admin {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
