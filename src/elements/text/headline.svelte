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

	/*@media (max-width: 1280px) {
		.big {
			font-size: 3.5rem;
		}

		.small {
			font-size: 2.5rem;
		}
	}*/

	@media (max-width: 600px){
		.big {
			font-size: 2.5rem;
		}

		.small {
			font-size: 2rem;
		}
	}
</style>
