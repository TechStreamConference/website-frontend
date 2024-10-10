<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Menu from 'menu/404';

	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import Button from 'elements/input/button.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	function onClick() {
		goto('/');
	}
</script>

<Header menu={Menu.header} />
<div class="wrapper page-404">
	<div class="content">
		<HeadlinePage classes="border">{$page.status}</HeadlinePage>
		{#if $page.error}
			<SubHeadline classes="subheadline">Fehler: {$page.error.message}</SubHeadline>
		{/if}

		<Button
			classes="text button"
			ariaLabel="Klicke um zur Hauptseite zu navigieren"
			on:click={onClick}
		>
			Hauptseite
		</Button>
	</div>
	<Footer menu={Menu.footer} currentYear={2024} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	.page-404 :global(.subheadline) {
		margin-top: 2rem;
	}

	.page-404 :global(.button) {
		margin-top: 5rem;
		margin-bottom: 5rem;
	}
</style>
