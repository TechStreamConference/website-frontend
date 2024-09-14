<script lang="ts">
	export let href: string = '';
</script>

<a {href} target="_blank" rel="noopener noreferrer"><slot /></a>

<style>
	a {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
		text-align: var(--text-align);
		margin: 0 auto;
		align-self: center;
		border-radius: 0.2rem;
		text-decoration-color: var(--primary-color);
		background-color: none;
		transition: background-color var(--transition-duration);
		transition: text-decoration-color var(--transition-duration);
		outline: none;
		outline-color: var(--third-color);
		transition: outline var(--transition-duration);
	}

	a:hover {
		background-color: var(--third-color);
		transition: background-color outline-color var(--transition-duration);
		outline: 0.5rem solid;
		outline-color: var(--third-color);
		transition: outline var(--transition-duration);
	}

	a:active {
		text-decoration-color: var(--lines-color);
		transition: text-decoration-color var(--transition-duration);
	}

	@media (max-width: 1280px) {
		a {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 600px) {
		a {
			font-size: 1rem;
		}
	}
</style>
