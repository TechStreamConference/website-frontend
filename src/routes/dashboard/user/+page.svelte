<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';

	import type { LoadUser } from 'types/loadTypes';
	export let data: LoadUser; // data from database

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<Header menu={Menu.headerIn(data.roles)} />
<div class="wrapper page-dashboard-user">
	<HeadlinePage classes="headline">User</HeadlinePage>
	<TextLine classes="text" --text-align="center">TODO: Hier kommt das Beste User hin.</TextLine>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}

	.page-dashboard-user :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-dashboard-user :global(.text) {
		margin-bottom: 5rem;
	}

	.page-dashboard-user :global(.button) {
		margin: 0 auto;
	}
</style>
