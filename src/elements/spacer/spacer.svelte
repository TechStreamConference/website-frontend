<script>
	export let classes = '';
</script>

<div class={classes}></div>

<style>
	div {
		height: var(--height);
		width: var(--width);
	}

	.header {
		height: var(--height);
		width: var(--width);
	}

	@media (max-width: 1280px) {
		div {
			height: calc(var(--height) / 2);
			width: calc(var(--width) / 2);
		}
	}
</style>
