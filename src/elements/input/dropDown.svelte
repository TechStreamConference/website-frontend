<script lang="ts">
	import Label from 'elements/text/label.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let labelText: string;

	export let data: unknown[];
	export let selected: unknown;

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'Enter') {
			dispatch('submit');
		}
	}
</script>

<div class="drop-down-wrapper">
	<Label for_={id}>{labelText}</Label>
	<select {id} bind:value={selected} on:input on:keydown={handleKeydown}>
		{#each data as entry}
			<option value={entry}>{entry}</option>
		{/each}
	</select>
</div>

<style>
    .drop-down-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    select {
        font-size: 1rem;
        line-height: 1.5rem;
        letter-spacing: 1px;
        font-family: gnuolane, sans-serif;
        font-weight: 500;
        font-style: normal;
        color: var(--white-color);
        background-color: var(--primary-color-light);
        border-radius: var(--border-radius);
        padding: 0.5rem;
        width: 100%;
    }
</style>
