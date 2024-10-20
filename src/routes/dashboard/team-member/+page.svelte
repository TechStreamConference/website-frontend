<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import Header from 'elements/navigation/header.svelte';

	import type { LoadTeamMember } from 'types/loadTypes';
	export let data: LoadTeamMember; // data from database

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
</script>

<Header menu={Menu.headerOut(data.roles)} />
<div class="wrapper page-dashboard-team-member">
	<HeadlinePage classes="headline">Team Member</HeadlinePage>
	<TextLine classes="text" --text-align="center">
		TODO: Hier kommt das Beste Team Member hin.
	</TextLine>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}

	.page-dashboard-team-member :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-dashboard-team-member :global(.text) {
		margin-bottom: 5rem;
	}

	.page-dashboard-team-member :global(.button) {
		margin: 0 auto;
	}
</style>
