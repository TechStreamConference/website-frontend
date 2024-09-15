<script lang="ts">
	export let classes: string = 'standart';
	export let href: string = '';
	export let newTab: boolean = false;
</script>

<a {href} class={classes} target={newTab ? '_blank' : ''} rel="noopener noreferrer"><slot /></a>

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
		margin: 0 auto;
		align-self: center;
		padding: 3px;
		border-radius: 5px;
		background-color: none;
		text-decoration: none;
	}

	.standart {
		transition: background-color var(--transition-duration);
	}

	.standart:hover {
		background-color: var(--third-color);
		transition: background-color var(--transition-duration);
	}

	.inline {
		transition: color var(--transition-duration);
		transition: text-decoration-color var(--transition-duration);
		padding: 0;
		border-radius: 0;
		text-decoration: underline;
		text-decoration-color: var(--primary-color);
	}

	.inline:hover {
		color: var(--third-color);
		transition: color var(--transition-duration);
	}

	.inline:active {
		text-decoration-color: var(--lines-color);
		transition: text-decoration-color var(--transition-duration);
	}

	.white {
		color: var(--white-color);
	}
</style>
