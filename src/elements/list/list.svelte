<script>
	export let classes = '';
</script>

<ul class={classes}>
	<slot />
</ul>

<style>
	ul {
		margin: 0 auto;
		padding: var(--padding);
		width: var(--width)
	}

	.padding-left {
		padding-left: 2rem;
	}
</style>
