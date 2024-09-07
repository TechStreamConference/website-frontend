<script>
	export let size = 'big';
</script>

<h2 class={size}><slot /></h2>

<style>
	h2 {
		font-family: gnuolane, sans-serif;
		font-weight: 200;
		text-transform: capitalize;
		font-style: normal;
		color: var(--text-color);
		margin: 0;
	}
	.big {
		font-size: 3rem;
	}
	.small {
		font-size: 1.5rem;
	}

	/*@media (max-width: 1280px) {
		.big {
			font-size: 2.5rem;
		}

		.small {
			font-size: 1.5rem;
		}
	}*/

	@media (max-width: 600px){
		.big {
			font-size: 2rem;
		}

		.small {
			font-size: 1rem;
		}
	}
</style>
