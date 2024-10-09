<script lang="ts">
	import { goto } from '$app/navigation';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper page-backend">
	<HeadlinePage classes="headline">Backend</HeadlinePage>
	<TextLine classes="text" --text-align="center">TODO: Hier kommt das Beste Backend hin.</TextLine>
	<Button
		classes="text button"
		ariaLabel="Kehre zur akruellen Hautseite zurück"
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

	.page-backend :global(.headline) {
		margin-bottom: 3rem;
	}

	.page-backend :global(.text) {
		margin-bottom: 5rem;
	}

	.page-backend :global(.button) {
		margin: 0 auto;
	}
</style>
