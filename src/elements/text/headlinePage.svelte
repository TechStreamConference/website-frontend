<script lang="ts">
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
</script>

<div class="wrapper">
	<SpacerHeader />
	<Headline classes="headline"><slot /></Headline>
	<HorizontalLine />
</div>

<style>
	.wrapper {
		margin: 0 auto;
		width: fit-content;
	}

	:global(.headline) {
		padding: 0 3rem;
		width: fit-content;
	}

	@media (max-width: 600px) {
		:global(.headline) {
			padding: 0 1rem;
			width: fit-content;
		}
	}

	@media (max-width: 1280px) {
		:global(.headline) {
			padding: 0 2rem;
			width: fit-content;
		}
	}
</style>
