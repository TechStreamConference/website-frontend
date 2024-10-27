<script lang="ts">
	import { typeWorkaround } from 'types/workaround';
	import TextLine from 'elements/text/textLine.svelte';
	export let type: string = 'button';
	export let classes: string = 'text';
	export let ariaLabel: string;
</script>

<button class="hover-move {classes}" use:typeWorkaround={type} on:click aria-label={ariaLabel}>
	<TextLine classes="white"><slot /></TextLine>
</button>

<style>
	button {
		background-color: var(--primary-color-light);
		border: none;
		border-radius: var(--border-radius);
		justify-self: center;
	}

	.text {
		padding: var(--full-padding) var(--2x-padding);
	}
</style>
