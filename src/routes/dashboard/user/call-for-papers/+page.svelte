<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Tabs from 'elements/navigation/tabs.svelte';
</script>

<Tabs
	entries={Menu.user}
	entryName={MenuItem.userCallForPapers.name}
	classes="navigation-tabs-dashboard-subpage"
/>
<TextLine>Standard Values for call for papers</TextLine>
<TextLine></TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
	<ListElement classes="list-element-dot">
		GET /api/dashboard/event/new/available (checks if the current user is already speaker of the
		current event and if the current is open for call-for-papers)
	</ListElement>
	<ListElement classes="list-element-dot">
		PUT /api/dashboard/speaker/new (all event specific data)
	</ListElement>
</List>
