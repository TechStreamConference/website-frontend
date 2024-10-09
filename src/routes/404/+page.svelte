<script lang="ts">
	import { goto } from '$app/navigation';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper page-404">
	<HeadlinePage classes="headline">404</HeadlinePage>
	<TextLine classes="text" --text-align="center">TODO: 404 Page.</TextLine>
	<Button
		classes="text button"
		ariaLabel="Kehre zur aktuellen Hauptseite zurück"
		on:click={() => {
			goto('/');
		}}
	>
		Start
	</Button>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}

	.page-404 :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-404 :global(.text) {
		margin-bottom: 5rem;
	}
	.page-404 :global(.button){
		margin: 0 auto;
	}
</style>
