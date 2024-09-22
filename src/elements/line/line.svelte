<script lang="ts">
	export let classes: string = 'normal';
</script>

<div class={classes} />

<style>
	.normal {
		height: var(--height);
		width: var(--width);
	}

	div {
		background-color: var(--lines-color);
	}
</style>
