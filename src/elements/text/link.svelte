<script lang="ts">
	export let classes: string = 'standard';
	export let href: string = '';
	export let newTab: boolean = false;
	export let title: string;
</script>

<a {href} class={classes} target={newTab ? '_blank' : ''} rel="noopener noreferrer" {title}>
	<slot />
</a>

<style>
	a {
		font-size: 1rem;
		letter-spacing: 1px;
		line-height: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 300;
		font-style: normal;
		color: var(--text-color);
		text-align: var(--text-align);
		align-self: center;
		padding: 3px;
		border-radius: 5px;
		background-color: none;
		text-decoration: none;
		transition: var(--transition-duration);
	}

	.standard {
		transition: background-color var(--transition-duration);
	}

	.standard:hover {
		background-color: var(--primary-color-dark);
		transition: background-color var(--transition-duration);
	}

	.inline {
		transition: color var(--transition-duration);
		transition: text-decoration-color var(--transition-duration);
		border-radius: 0;
		text-decoration: underline;
		text-decoration-color: var(--primary-color-light);
	}

	.inline:hover {
		color: var(--primary-color-dark);
		transition: color var(--transition-duration);
	}

	.inline:active {
		text-decoration-color: var(--lines-color);
		transition: text-decoration-color var(--transition-duration);
	}

	.white {
		color: var(--white-color);
	}

	.animated:hover {
		background-color: var(--primary-color-mid);
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
	}

	.animated:active {
		background-color: var(--primary-color-dark);
		box-shadow: 1px 1px var(--light-gray-color);
		transform: translateY(0px) translateX(0px);
		transition: var(--fast-transition-duration);
	}

	@media (max-width: 1280px) {
		.animated:hover {
			background-color: var(--primary-color-light);
			box-shadow: none;
			transition: var(--transition-duration);
		}

		.animated:active {
			box-shadow: 2px 2px var(--light-gray-color);
			transition: var(--fast-transition-duration);
		}
	}
</style>
