<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';

	import { typeWorkaround } from 'types/workaround';

	export let ariaLabel: string;

	export let classes: string = 'button-text';
	export let fontSize: 'small' | 'medium' | 'large' = 'medium';
	export let type: string = 'button';
</script>

<button
	class="hover-move {classes} {fontSize}"
	use:typeWorkaround={type}
	on:click
	aria-label={ariaLabel}
>
	<p class="normal-font"><slot /></p>
</button>

<style>
	button {
		background-color: var(--primary-color-light);
		border: none;
		border-radius: var(--border-radius);
		justify-self: center;
	}

	.button-text {
		padding: var(--2x-padding) var(--4x-padding);
	}

	p {
		text-align: var(--text-align);
		color: var(--white-color);
	}

	.small {
		font-size: var(--half-font-size);
	}
	.medium {
		font-size: var(--full-font-size);
	}
	.large {
		font-size: var(--4x-font-size);
	}
</style>
