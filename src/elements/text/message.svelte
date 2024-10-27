<script lang="ts">
	import TextLine from './textLine.svelte';

	import { fade } from 'svelte/transition';

	export let message: string = '';
	export let classes: string = 'message-error-color';
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
		padding: var(--half-padding) var(--full-padding);
		border-radius: var(--border-radius);
		margin: var(--quad-margin) 0;
	}

	.message-error-color {
		background-color: var(--error-color);
	}

	.message-success-color {
		background-color: var(--success-color);
	}
</style>
