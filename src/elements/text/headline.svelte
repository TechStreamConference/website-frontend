<script lang="ts">
	export let size: string = 'big';
	export let classes: string = '';
</script>

<h1 class="{size} {classes}"><slot /></h1>

<style>
	h1 {
		letter-spacing: 1px;
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
		line-height: 6rem;
	}
	.small {
		font-size: 3rem;
		line-height: 4rem;
	}

	@media (max-width: 1280px) {
		.big {
			font-size: 4rem;
			line-height: 5rem;
		}
		.small {
			font-size: 2rem;
			line-height: 2.5rem;
		}
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
