<script>
	export let classes = '';
</script>

<li class={classes}>
	<slot />
</li>

<style>
	li {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
		margin: 0;
		list-style-type: none;
	}

	.dot {
		list-style-type: disc;
	}

	@media (max-width: 1280px) {
		li {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 600px){
		li {
			font-size: 1rem;
		}
	}
</style>
