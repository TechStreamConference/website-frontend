<script lang="ts">
	import Spacer from './spacer.svelte';
</script>

<Spacer classes="header-spacer" />

<style>
	:global(.header-spacer) {
		height: 9rem !important;
	}

	@media (max-width: 1280px) {
		:global(.header-spacer) {
			height: 6rem !important;
		}
	}
</style>
