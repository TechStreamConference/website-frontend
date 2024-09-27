<script lang="ts">
	import { goto } from '$app/navigation';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper">
	<HeadlinePage classes="backend-headline">Backend</HeadlinePage>
	<TextLine classes="backend-text" --text-align="center">
		TODO: Hier kommt das Beste Backend hin.
	</TextLine>
	<Button
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

	:global(.backend-headline) {
		margin-bottom: 3rem;
	}

	:global(.backend-text) {
		margin-bottom: 5rem;
	}
</style>
