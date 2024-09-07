<script>
	import Label from 'elements/label.svelte';
	import TextInput from './textInput.svelte';
	import PasswordInput from './passwordInput.svelte';

	export let type = '';
	export let id = '';
	export let labelText = '';
	export let placeholderText = '';
	export let textValue = '';
</script>

<div class="wrapper">
	<Label {id}>{labelText}</Label>
	{#if type === 'text'}
		<TextInput {id} {placeholderText} bind:value={textValue} on:input />
	{:else if type === 'password'}
		<PasswordInput {id} {placeholderText} bind:value={textValue} on:input />
	{/if}
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

	@media (max-width: 600px) {
		.wrapper :global(input) {
			font-size: 1rem;
		}
	}
</style>
