<script lang="ts">
	import { typeWorkaround } from 'types/workaround';

	import Label from 'elements/text/label.svelte';

	export let ariaLabel: string;

	export let classes: string = '';
	export let type: string = '';
	export let id: string = '';
	export let labelText: string = '';
	export let placeholderText: string = '';

	export let value: string | number = '';
</script>

<div class="{classes}">
	<Label for_={id}>{labelText}</Label>
	<input
		class="normal-font"
		{id}
		use:typeWorkaround={type}
		name={id}
		placeholder={placeholderText}
		bind:value
		on:input
		aria-label={ariaLabel}
	/>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	input {
		color: var(--white-color);
		background-color: var(--primary-color-light);
		border-radius: var(--border-radius);
		border: none;
		padding: var(--half-padding);
		width: 100%;
		font-size: var(--full-font-size);
	}
</style>
