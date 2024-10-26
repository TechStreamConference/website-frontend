<script lang="ts">
	export let size: string = 'big';
	export let classes: string = '';
</script>

<h2 class="headline-font {size} {classes}"><slot /></h2>

<style>
	h2 {
		text-align: center;
	}
	.big {
		font-size: 3rem;
		line-height: 4rem;
	}
	.small {
		font-size: 2rem;
		line-height: 3rem;
	}
	.border {
		border-bottom: 1px solid var(--line-color);
	}

	@media (max-width: 600px) {
		.big {
			font-size: 2rem;
			line-height: 3rem;
		}
		.small {
			font-size: 1rem;
			line-height: 1.5rem;
		}
	}
</style>
