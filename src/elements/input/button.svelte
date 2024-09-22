<script lang="ts">
	import { typeWorkaround } from 'types/workaround';
	export let type: string = 'button';
	export let classes: string = 'text';
</script>

<button class={classes} use:typeWorkaround={type} on:click><slot /></button>

<style>
	button {
		background-color: var(--primary-color);
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: var(--transition-duration);
		justify-self: center;
	}

	button:hover {
		background-color: var(--secondary-color);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	button:active {
		background-color: var(--third-color);
		box-shadow: 1px 1px var(--light-gray-color);
		transform: translateY(0px) translateX(0px);
		transition: var(--fast-transition-duration);
	}

	.text {
		padding: 1rem 2rem;
		margin: 0 auto;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
	}

	.picture {
		padding: 0;
	}

	@media (max-width: 1280px) {
		button:hover {
			background-color: var(--primary-color);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		button:active {
			box-shadow: 2px 2px var(--light-gray-color);
			transition: var(--fast-transition-duration);
		}
	}
</style>
