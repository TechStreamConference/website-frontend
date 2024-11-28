<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Tabs from 'elements/navigation/tabs.svelte';
</script>

<Tabs entries={Menu.teamMember} entryName={MenuItem.teamMemberSocialMedia.name} />
<TextLine>Social Media Data from Team Member</TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
	<ListElement classes="list-element-dot">GET /api/dashboard/team-member/socials</ListElement>
	<ListElement classes="list-element-dot">PUT /api/dashboard/team-member/socials</ListElement>
</List>
