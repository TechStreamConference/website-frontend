<script lang="ts">
	import { fade } from 'svelte/transition';
	import TextLine from './textLine.svelte';
	export let message: string = '';
	export let classes: string = 'error-color';
</script>

{#if message !== ''}
	<p class="normal-font {classes}" transition:fade={{ duration: 300 }}>
		<TextLine --text-align="center">
			{message}
		</TextLine>
	</p>
{/if}

<style>
	p {
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		margin: 2px 0;
	}

	.error-color {
		background-color: var(--error-color);
	}

	.success-color {
		background-color: var(--success-color);
	}
</style>
