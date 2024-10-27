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
		padding: 0 var(--2x-padding);
		margin-top: var(--2x-margin);
		width: fit-content;
	}

	@media (max-width: 1280px) {
		.text-headline-page :global(.headline) {
			padding: 0 var(--2x-padding);
			margin-top: var(--full-margin);
			width: fit-content;
		}
	}

	@media (max-width: 600px) {
		.text-headline-page :global(.headline) {
			padding: 0 var(--full-padding);
			width: fit-content;
		}
	}
</style>
