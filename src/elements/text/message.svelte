<script lang="ts">
	import { fade } from 'svelte/transition';
	export let message: string = '';
	export let classes: string = 'error-color';
</script>

{#if message !== ''}
	<p class={classes} transition:fade={{ duration: 300 }}>{message}</p>
{/if}

<style>
	p {
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

	.error-color {
		background-color: var(--error-color);
	}

	.success-color {
		background-color: var(--success-color);
	}
</style>
