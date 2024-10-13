<script lang="ts">
	import type { Person, Talk } from 'types/provideTypes';
	export let speakers: Person[];
	export let schedule: Talk[];

	import ScheduleEntry from './scheduleEntry.svelte';

	import { error } from '@sveltejs/kit';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	export let personPopupCallback: (event: Event, person: Person) => void;

	function getSpeakerById(id: string): Person {
		for (const speaker of speakers) {
			if (speaker.id === id) {
				return speaker;
			}
		}

		console.error(`error while looking up speaker with ID ${id}.`);
		throw error(404);
	}
</script>

<SubHeadline>Samstag, 24.05.25</SubHeadline>
<div class="day">
	{#each schedule as talk}
		<ScheduleEntry speaker={getSpeakerById(talk.speaker_id)} {talk} {personPopupCallback} />
	{/each}
</div>

<style>
	.day {
		display: grid;
		grid-template-columns: 15rem 1fr;
		row-gap: 3rem;
	}
</style>
