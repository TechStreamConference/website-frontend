<script>
	export let size = 'big';
</script>

<h1 class={size}><slot /></h1>

<style>
	h1 {
		font-family: proxima-nova, sans-serif;
		font-weight: 900;
		text-transform: uppercase;
		font-style: normal;
		color: var(--text-color);
        text-align: center;
        margin: 0;
	}
	.big {
		font-size: 5rem;
	}
	.small {
		font-size: 3rem;
	}
</style>
