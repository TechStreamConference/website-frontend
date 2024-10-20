<script lang="ts">
	import type { LoadSpeaker } from 'types/loadTypes';
	export let data: LoadSpeaker; // data from database

	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<Header menu={Menu.headerIn(data.roles)} />
<div class="wrapper page-dashboard-speaker">
	<div class="content">
		<HeadlinePage classes="headline">Speaker</HeadlinePage>
		<TextLine classes="text" --text-align="center">TODO: Hier kommt das Beste Speaker hin.</TextLine
		>
	</div>

	<Footer menu={Menu.footerIn} globals={data.globals} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
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
