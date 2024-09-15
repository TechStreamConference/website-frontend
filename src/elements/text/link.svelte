<script lang="ts">
	export let href: string = '';
</script>

<a {href} target="_blank" rel="noopener noreferrer"><slot /></a>

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
		text-decoration-color: var(--primary-color);
		transition: text-decoration-color var(--transition-duration);
		transition: color var(--transition-duration);
	}

	a:hover {
		color: var(--primary-color);
		transition: color var(--transition-duration);
	}

	a:active {
		text-decoration-color: var(--lines-color);
		transition: text-decoration-color var(--transition-duration);
	}
</style>
