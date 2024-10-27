<script lang="ts">
	export let classes: string = '';
	export let size: string = 'big';
</script>

<h3 class="sub-headline-font {classes} {size}"><slot /></h3>

<style>
	.big {
		font-size: var(--1-5x-font-size);
		line-height: var(--1-5x-line-height);
	}
	.small {
		font-size: var(--full-font-size);
		line-height: var(--full-line-height);
	}

	.white {
		color: var(--white-color);
	}
</style>
