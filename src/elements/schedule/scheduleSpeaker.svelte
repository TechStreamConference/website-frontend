<script lang="ts">
	import Button from 'elements/input/button.svelte';
	import type { Person } from 'types/provideTypes';

	export let speaker: Person;
</script>

<Button ariaLabel="Mehr Informationen zu {speaker.name}" on:click>{speaker.name}</Button>
