<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
	export let classes: string = '';
</script>

<div class="wrapper text-headline-page">
	<Headline classes="headline border {classes}"><slot /></Headline>
</div>

<style>
	.wrapper {
		margin: 0 auto;
		width: fit-content;
	}

	.text-headline-page :global(.headline) {
		padding: 0 3rem;
		margin-top: 2rem;
		width: fit-content;
	}

	@media (max-width: 1280px) {
		.text-headline-page :global(.headline) {
			padding: 0 2rem;
			margin-top: 1rem;
			width: fit-content;
		}
	}

	@media (max-width: 600px) {
		.text-headline-page :global(.headline) {
			padding: 0 1rem;
			width: fit-content;
		}
	}
</style>
