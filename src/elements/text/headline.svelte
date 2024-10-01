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

	.green {
		color: var(--secondary-color);
	}

	.left {
		text-align: left;
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
