<script lang="ts">
	export let classes: string = '';
	export let size: string = 'big';
</script>

<h3 class="{classes} {size}"><slot /></h3>

<style>
	h3 {
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
	}
	.big {
		font-size: 1.5rem;
		line-height: 2rem;
	}
	.small {
		font-size: 1.2rem;
		line-height: 1.7rem;
	}

	.white {
		color: var(--white-color);
	}
</style>
