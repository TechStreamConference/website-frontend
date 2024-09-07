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
		width: 100%;
	}

	.padding-left {
		padding-left: 2rem;
	}

	@media (max-width: 600px) {
		.padding-left {
			padding-left: 1.5rem;
		}
	}
</style>
