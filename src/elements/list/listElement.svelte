<script lang="ts">
	export let classes: string = '';
</script>

<li class={classes}>
	<slot />
</li>

<style>
	li {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
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
</style>
