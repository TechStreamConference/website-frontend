<script lang="ts">
	export let size: string = 'big';
	export let classes: string = '';
</script>

<h1 class="headline-font {size} {classes}"><slot /></h1>

<style>
	h1 {
		text-align: center;
	}
	.big {
		font-size: var(--4x-font-size);
		line-height: var(--4x-line-height);
	}
	.small {
		font-size: var(--2x-font-size);
		line-height: var(--2x-line-height);
	}

	.border {
		border-bottom: 1px solid var(--line-color);
	}

	.green {
		color: var(--secondary-color);
	}

	.left {
		text-align: left;
	}

	@media (max-width: 600px) {
		.big {
			font-size: var(--2x-font-size);
			line-height: var(--2x-line-height);
		}
		.small {
			font-size: var(--full-font-size);
			line-height: var(--full-line-height);
		}
	}
</style>
