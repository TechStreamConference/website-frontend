<script lang="ts">
	import { typeWorkaround } from 'types/workaround';
	export let type: string = 'button';
	export let classes: string = 'text';
	export let ariaLabel: string;
</script>

<button class={classes} use:typeWorkaround={type} on:click aria-label={ariaLabel}><slot /></button>

<style>
	button {
		background-color: var(--primary-color-light);
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: var(--transition-duration);
		justify-self: center;
	}

	button:hover {
		background-color: var(--primary-color-mid);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	button:active {
		background-color: var(--primary-color-dark);
		box-shadow: 1px 1px var(--gray-color-light);
		transform: translateY(0px) translateX(0px);
		transition: var(--fast-transition-duration);
	}

	.text {
		padding: 1rem 2rem;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
	}

	@media (max-width: 1280px) {
		button:hover {
			background-color: var(--primary-color-light);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		button:active {
			box-shadow: 2px 2px var(--gray-color-light);
			transition: var(--fast-transition-duration);
		}
	}
</style>
