<button class="button" on:click><slot /></button>

<style>
	.button {
		background-color: var(--primary-color);
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: var(--transition-duration);
		padding: 1rem 2rem;
		margin: auto;
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
	}

	.button:hover {
		background-color: var(--secondary-color);
		box-shadow: 6px 6px var(--gray-color);
		transition: var(--transition-duration);
	}

	.button:active {
		background-color: var(--third-color);
		box-shadow: 2px 2px var(--light-gray-color);
		transform: translateY(4px) translateX(4px);
		transition: var(--fast-transition-duration);
	}

	@media (max-width: 1280px) {
		.button:hover {
			background-color: var(--primary-color);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		.button:active {
			box-shadow: 2px 2px var(--light-gray-color);
			transition: var(--fast-transition-duration);
		}
	}
</style>
