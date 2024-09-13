<script lang="ts">
	import TextLine from './textLine.svelte';
	export let href: string = '';
</script>

<a {href}><TextLine><slot /></TextLine></a>

<style>
	a {
		margin: 0 auto;
		align-self: center;
		padding: 0.3rem;
		border-radius: 0.6rem;
		text-decoration-color: var(--primary-color);
		background-color: var(--background-color);
		transition: background-color var(--transition-duration);
		transition: text-decoration-color var(--transition-duration);
	}

	a:hover {
		background-color: var(--third-color);
		transition: background-color var(--transition-duration);
	}

	a:active {
		text-decoration-color: var(--lines-color);
		transition: text-decoration-color var(--transition-duration);
	}
</style>
