<script>
	export let id = '';
</script>

<label for={id}><slot /></label>

<style>
	label {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
	}

	@media (max-width: 1280px) {
		label {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 600px) {
		label {
			font-size: 1rem;
		}
	}
</style>
