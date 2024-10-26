<script lang="ts">
	export let classes: string = '';
	export let size: string = 'big';
</script>

<h3 class="sub-headline-font {classes} {size}"><slot /></h3>

<style>
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
