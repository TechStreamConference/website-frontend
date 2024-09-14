<script lang="ts">
	export let classes: string = '';
</script>

<div class={classes}></div>

<style>
	div {
		height: var(--height);
		width: var(--width);
	}

	@media (max-width: 600px) {
		div {
			height: calc(var(--height) / 1.5);
			width: calc(var(--width) / 1.5);
		}
	}

	@media (max-width: 1280px) {
		div {
			height: calc(var(--height) / 2);
			width: calc(var(--width) / 2);
		}
	}
</style>
