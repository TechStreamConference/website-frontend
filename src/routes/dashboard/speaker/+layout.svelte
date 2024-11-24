<script lang="ts">
	import Tabs from 'elements/navigation/tabs.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Menu } from 'types/provideTypes';
	const tabsEntries: Menu = [
		{
			name: 'Event',
			url: '/dashboard/speaker/event',
			description: 'Klicke hier um zu den Event spezifischen Einstellungen zugelangen.'
		},
		{
			name: 'Social Media',
			url: '/dashboard/speaker/socials',
			description: 'Klicke hier um zu den Social Media Einstellungen zugelangen.'
		},
		{
			name: 'Bewerbung',
			url: '/dashboard/speaker/call-for-papers',
			description: 'Klicke hier um dich als Speaker für das aktuelle Event zu bewerben.'
		}
	];
</script>

<div class="dashboard-speaker">
	<Headline classes="headline-border">Speaker</Headline>
	<Tabs entries={tabsEntries} />
</div>
<slot />

<style>
	.dashboard-speaker {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
