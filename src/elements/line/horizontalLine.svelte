<script>
	import Line from './line.svelte';
</script>

<Line --height="1px" />

<style>
	:global(div.line) {
		width: var(--width);
        margin: 0 auto;
	}
</style>
