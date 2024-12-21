<script lang="ts">
	import TextLine from './textLine.svelte';

	import { fade } from 'svelte/transition';

	export let message: string = '';
	export let classes: string = 'message-error-color';
	export let color: 'error' | 'success' = 'error';
</script>

{#if message !== ''}
	<p class="normal-font {classes} {color}" transition:fade={{ duration: 300 }}>
		<TextLine --text-align="center" classes={color === 'error' ? 'text-line-black' : ''}>
			{message}
		</TextLine>
	</p>
{/if}

<style>
	p {
		padding: var(--half-padding) var(--full-padding);
		border-radius: var(--border-radius);
		margin: var(--quad-margin) 0;
	}

	.error {
		background-color: var(--error-color);
	}

	.success {
		background-color: var(--success-color);
	}

	.message-pre-wrap {
		white-space: pre-wrap;
	}
</style>
