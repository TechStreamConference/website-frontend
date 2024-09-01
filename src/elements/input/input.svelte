<script>
	import TextInput from './textInput.svelte';
	import PasswordInput from './passwordInput.svelte';

	export let type = '';
	export let labelText = '';
	export let placeholderText = '';
	export let textValue = '';
	export let numberValue = 0;
</script>

<div class="wrapper">
	<label for="input" class="my-label">{labelText}</label>
	{#if type === 'text'}
		<TextInput {placeholderText} on:input bind:value={textValue} />
	{:else if type === 'password'}
		<PasswordInput {placeholderText} on:input bind:value={textValue} />
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: var(--width);
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
</style>
