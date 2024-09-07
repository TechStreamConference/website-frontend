<p><slot /></p>

<style>
	p {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
		text-wrap: wrap;
		margin: 0;
		text-align: var(--text-align);
		width: var(--width);
	}

	@media (max-width: 600px){
		p {
			font-size: 1rem;
		}
	}
</style>
