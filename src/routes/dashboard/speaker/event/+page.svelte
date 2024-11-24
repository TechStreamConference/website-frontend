<script lang="ts">
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<TextLine>Drop Down with awailable Events</TextLine>
<TextLine>Event Data from Speaker</TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
	<ListElement classes="list-element-dot">
		GET /api/dashboard/speaker/event/[:num] (all event specific data)
	</ListElement>
	<ListElement classes="list-element-dot">
		PUT /api/dashboard/speaker/event/[:num] (all event specific data)
	</ListElement>
</List>
