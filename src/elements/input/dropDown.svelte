<script lang="ts">
	import Label from "elements/text/label.svelte";
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

<Label {id}>{labelText}</Label>
<select {id} bind:value={selected} on:input on:keydown={handleKeydown}>
	{#each data as entry}
		<option value={entry}>{entry}</option>
	{/each}
</select>

<style>

</style>