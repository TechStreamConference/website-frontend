<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Menu from 'menu/404';

	import { onMount } from 'svelte';
	import { defaultCurrentYear } from 'delete/toDelete';
	export let data: number;

	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import Button from 'elements/input/button.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	onMount(async (): Promise<void> => {
		data = defaultCurrentYear; // API call when endpoint is implemented
		if (data) {
			return;
		}
		data = 0; // initialize to prevent an error
	});

	function onClick() {
		goto('/');
	}
</script>

<Header menu={Menu.header} />
<div class="wrapper page-404">
	<div class="content">
		<HeadlinePage classes="border">{$page.status}</HeadlinePage>
		{#if $page.error}
			{#if $page.status === 404}
				<SubHeadline classes="subheadline">
					Uuups! Die Seite konnte nicht gefunden werden 👻
				</SubHeadline>
			{:else}
				<SubHeadline classes="subheadline">{$page.error.message}</SubHeadline>
			{/if}
		{/if}

		<Button
			classes="text button"
			ariaLabel="Klicke um zur Hauptseite zu navigieren"
			on:click={onClick}
		>
			Hauptseite
		</Button>
	</div>
	<Footer menu={Menu.footer} currentYear={data} />
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
