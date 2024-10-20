<script lang="ts">
	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Menu } from 'types/provideTypes';
	const tabsEntries: Menu = [
		{
			name: 'entry',
			url: '/dashboard/user/test',
			description: 'Klicke hier um zu TEST zu gelangen.'
		}
	];
</script>

<div class="headline-wrapper dashboard-admin">
	<Headline classes="headline border">User</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.headline-wrapper {
		max-width: 70rem;
		margin: 2rem auto 0;
	}
</style>
