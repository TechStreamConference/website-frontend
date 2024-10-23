<script lang="ts">
	import Label from 'elements/text/label.svelte';
	import { typeWorkaround } from 'types/workaround';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let classes: string = '';
	export let id: string;
	export let labelText: string;

	export let type: string;
	export let placeholderText: string;
	export let value: string | number = '';
	export let ariaLabel: string;
	export let rows: number = 10;

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'Enter') {
			dispatch('submit');
		}
	}
</script>

<div class="wrapper text-area {classes}">
	<Label {id}>{labelText}</Label>
	<textarea
		{id}
		use:typeWorkaround={type}
		name={id}
		placeholder={placeholderText}
		bind:value
		on:input
		aria-label={ariaLabel}
		{rows}
		on:keydown={handleKeydown}
	/>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.text-area :global(textarea) {
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
		height: 100%;
		overflow: auto;
		resize: vertical;
	}
</style>
