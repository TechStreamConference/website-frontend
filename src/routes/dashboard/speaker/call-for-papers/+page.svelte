<script lang="ts">
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<TextLine>Standart Values for call for papers</TextLine>
<TextLine></TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
	<ListElement classes="list-element-dot">
		GET /api/dashboard/event/new/awailable (checks if the current user is already speaker of the
		current event and if the current is open for call-for-papers)
	</ListElement>
	<ListElement classes="list-element-dot">
		PUT /api/dashboard/speaker/new (all event specific data)
	</ListElement>
</List>
