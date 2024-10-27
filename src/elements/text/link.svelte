<script lang="ts">
	export let classes: string = 'standard';
	export let href: string = '';
	export let newTab: boolean = false;
	export let title: string;
</script>

<a {href} class="normal-font {classes}" target={newTab ? '_blank' : ''} rel="noopener noreferrer" {title}>
	<slot />
</a>

<style>
	a {
		font-size: 1rem;
		line-height: 1.5rem;
		text-align: var(--text-align);
		align-self: center;
		padding: var(--quad-padding);
		border-radius: var(--border-radius);
		background-color: transparent;
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
		text-decoration-color: var(--line-color);
		transition: text-decoration-color var(--transition-duration);
	}

	.white {
		color: var(--white-color);
	}
</style>
