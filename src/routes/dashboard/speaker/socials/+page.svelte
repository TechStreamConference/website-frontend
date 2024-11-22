<script lang="ts">
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<TextLine>Social Media Data from Speaker</TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
	<ListElement classes="list-element-dot">GET /api/dashboard/speaker/socials</ListElement>
	<ListElement classes="list-element-dot">PUT /api/dashboard/speaker/socials</ListElement>
</List>
