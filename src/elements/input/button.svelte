<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';

	import { typeWorkaround } from 'types/workaround';

	export let ariaLabel: string;

	export let classes: string = 'text';
	export let type: string = 'button';
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
		padding: var(--2x-padding) var(--4x-padding);
	}
</style>
