<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';

	import type { LoadSpeaker } from 'types/loadTypes';
	export let data: LoadSpeaker; // data from database

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<Header menu={Menu.headerOut(data.roles)} />
<div class="wrapper page-dashboard-speaker">
	<HeadlinePage classes="headline">Speaker</HeadlinePage>
	<TextLine classes="text" --text-align="center">TODO: Hier kommt das Beste Speaker hin.</TextLine>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}

	.page-dashboard-speaker :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-dashboard-speaker :global(.text) {
		margin-bottom: 5rem;
	}

	.page-dashboard-speaker :global(.button) {
		margin: 0 auto;
	}
</style>
