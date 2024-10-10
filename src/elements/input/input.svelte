<script lang="ts">
	import { typeWorkaround } from 'types/workaround';
	import Label from 'elements/text/label.svelte';

	export let classes: string = '';
	export let type: string = '';
	export let id: string = '';
	export let labelText: string = '';
	export let placeholderText: string = '';
	export let value: string | number = '';
	export let ariaLabel: string;
</script>

<div class="wrapper input-line {classes}">
	<Label {id}>{labelText}</Label>
	<input
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
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.input-line :global(input) {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
		background-color: var(--primary-color-light);
		border-radius: var(--border-radius);
		border: none;
		padding: 0.5rem;
		width: 100%;
	}
</style>
