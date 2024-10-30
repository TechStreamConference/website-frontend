<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
	export let classes: string = '';
</script>

<div>
	<Headline classes="headline-page-headline headline-border {classes}"><slot /></Headline>
</div>

<style>
	div {
		margin: 0 auto;
		width: fit-content;
	}

	:global(.headline-page-headline) {
		padding: 0 var(--2x-padding);
		margin-top: var(--2x-margin);
		width: fit-content;
	}

	@media (max-width: 1280px) {
		:global(.headline-page-headline) {
			padding: 0 var(--2x-padding);
			margin-top: var(--full-margin);
			width: fit-content;
		}
	}

	@media (max-width: 600px) {
		:global(.headline-page-headline) {
			padding: 0 var(--full-padding);
			width: fit-content;
		}
	}
</style>
