<p><slot /></p>

<style>
	p {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
		text-align: var(--text-align);
		margin: 0;
	}

	@media (max-width: 1280px) {
		p {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 600px){
		p {
			font-size: 1rem;
		}
	}
</style>
