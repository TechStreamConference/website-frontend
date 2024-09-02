<script>
	export let classes = '';
</script>

<ul class={classes}>
	<slot />
</ul>

<style>
	ul {
		margin: 0;
		padding: var(--padding);
	}

	.padding-left {
		padding-left: 2rem;
	}
</style>
