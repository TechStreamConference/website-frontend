<script>
	import Line from './line.svelte';
</script>

<Line --height="1px" />

<style>
	:global(div) {
		width: var(--width);
        margin: 0 auto;
	}
</style>
