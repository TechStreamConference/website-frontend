<script lang="ts">
	import Spacer from './spacer.svelte';
</script>

<Spacer classes="one-line-spacer" />

<style>
	:global(.one-line-spacer) {
		height: 1.5rem !important;
	}

	@media (max-width: 600px) {
		:global(.one-line-spacer) {
			height: 1rem !important;
		}
	}

	@media (max-width: 1280px) {
		:global(.one-line-spacer) {
			height: 1.3rem !important;
		}
	}
</style>
