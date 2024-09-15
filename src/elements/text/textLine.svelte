<script lang="ts">
	export let classes: string = '';
</script>

<p class={classes}><slot /></p>

<style>
	p {
		font-size: 1rem;
		letter-spacing: 1px;
		line-height: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 300;
		font-style: normal;
		color: var(--text-color);
		text-align: var(--text-align);
		margin: 0;
	}

	.white {
		color: var(--white-color);
	}
</style>
