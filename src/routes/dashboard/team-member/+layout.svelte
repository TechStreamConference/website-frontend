<script lang="ts">
	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Menu } from 'types/provideTypes';
	const tabsEntries: Menu = [
		{
			name: 'Event',
			url: '/dashboard/team-member/event',
			description: 'Klicke hier um zu den Event spezifischen Einstellungen zugelangen.'
		},
		{
			name: 'Social Media',
			url: '/dashboard/team-member/social-media',
			description: 'Klicke hier um zu den Social Media Einstellungen zugelangen.'
		}
	];
</script>

<div class="dashboard-team-member">
	<Headline classes="headline-border">Team Member</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.dashboard-team-member {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
