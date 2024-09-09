<script>
	import { fade } from 'svelte/transition';
	export let message = '';
</script>

{#if message !== ''}
	<p transition:fade={{ duration: 300 }}>{message}</p>
{/if}

<style>
	p {
		background-color: red;
		color: var(--white-color);
		padding: 0.5rem 1rem;
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		border-radius: var(--border-radius);
		margin: 2px 0;
		text-align: center;
	}

	@media (max-width: 1280px) {
		p {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 600px) {
		p {
			font-size: 1rem;
		}
	}
</style>
