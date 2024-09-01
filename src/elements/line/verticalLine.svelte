<script>
	import Line from './line.svelte';
</script>

<Line --width="1px" />

<style>
	:global(div) {
		height: var(--height);
		margin: auto 0;
	}
</style>
