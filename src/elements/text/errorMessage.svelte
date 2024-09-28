<script lang="ts">
	import { fade } from 'svelte/transition';
	export let message: string = '';
</script>

{#if message !== ''}
	<p transition:fade={{ duration: 300 }}>{message}</p>
{/if}

<style>
	p {
		background-color: var(--error-color);
		color: var(--text-color);
		padding: 0.5rem 1rem;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		border-radius: var(--border-radius);
		margin: 2px 0;
		text-align: center;
	}
</style>
