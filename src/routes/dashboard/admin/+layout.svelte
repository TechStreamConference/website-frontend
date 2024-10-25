<script lang="ts">
	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Menu } from 'types/provideTypes';

	const tabsEntries: Menu = [
		{
			name: 'Globals',
			url: '/dashboard/admin/globals',
			description: 'Klicke hier, um zu den globalen Einstellungen im Admin-Dashboard zu gelangen.'
		},
		{
			name: 'entry 2',
			url: '/dashboard/admin/test',
			description: 'Klicke hier, um zu TEST zu gelangen.'
		}
	];
</script>

<div class="headline-wrapper dashboard-admin">
	<Headline classes="headline border">Admin</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.headline-wrapper {
		max-width: 70rem;
		margin: 2rem auto 0;
	}
</style>
