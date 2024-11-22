<script lang="ts">
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<TextLine>Entries for spaker approval</TextLine>
<TextLine>Entries for spaker socials approval</TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
	<ListElement classes="list-element-dot">
		GET /api/dashboard/admin/approval/speaker (all speaker / should provide the year somehow)
	</ListElement>
	<ListElement classes="list-element-dot">
		PUT /api/dashboard/admin/approval/speaker (provides id and year)
	</ListElement>
	<ListElement classes="list-element-dot">
		GET /api/dashboard/admin/approval/socials (all speaker / should provide the year somehow)
	</ListElement>
	<ListElement classes="list-element-dot">
		PUT /api/dashboard/admin/approval/socials (provides id and year)
	</ListElement>
</List>
<br />
<TextLine>
	Do we need extra routes for Team etc or should they just be in the speaker route. But if so scale
	this to the team to.
</TextLine>
