<script lang="ts">
	import { goto } from '$app/navigation';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper">
	<HeadlinePage classes="_404-headline">404</HeadlinePage>
	<TextLine classes="_404-text" --text-align="center">TODO: 404 Page.</TextLine>
	<Button
		classes="text _404-button"
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

	:global(._404-headline) {
		margin-bottom: 3rem;
	}

	:global(._404-text) {
		margin-bottom: 5rem;
	}
	:global(._404-button){
		margin: 0 auto;
	}
</style>
