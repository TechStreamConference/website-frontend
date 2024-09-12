<script lang="ts">
	import { typeWorkaround } from 'types/workaround';
	import Label from 'elements/label.svelte';

	export let type: string = '';
	export let id: string = '';
	export let labelText: string = '';
	export let placeholderText: string = '';
	export let value: string | number = '';
</script>

<div class="wrapper">
	<Label {id}>{labelText}</Label>
	<input
		{id}
		use:typeWorkaround={type}
		name={id}
		placeholder={placeholderText}
		bind:value
		on:input
	/>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.wrapper :global(input) {
		font-size: 1.5rem;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
		background-color: var(--primary-color);
		border-radius: var(--border-radius);
		border: none;
		padding: 0.5rem;
		width: 100%;
	}

	@media (max-width: 1280px) {
		.wrapper :global(input) {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 600px) {
		.wrapper :global(input) {
			font-size: 1rem;
		}
	}
</style>
