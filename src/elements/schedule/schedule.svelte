<script lang="ts">
	import type { Person, Talk } from 'types/provideTypes';
	export let speakers: Person[];
	export let schedule: Talk[];

	import ScheduleEntry from './scheduleEntry.svelte';
	import { formatDate } from 'helper/dates';

	import { error } from '@sveltejs/kit';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	export let personPopupCallback: (event: Event, person: Person) => void;

	function getSpeakerById(id: number): Person {
		for (const speaker of speakers) {
			if (speaker.id === id) {
				return speaker;
			}
		}

		console.error(`error while looking up speaker with ID ${id}.`);
		throw error(404);
	}
</script>

{#if schedule[0]}
	<div class="schedule-element">
		{#if schedule[0].is_special}
			<!-- only using first element here because all elemenets schould be the same by now -->
			<SubHeadline>Bonusinhalte auf Youtube:</SubHeadline>
		{/if}
		<SubHeadline classes="subheadline-schedule">
			<!-- only using first element here because all elemenets schould be the same by now -->
			{formatDate(schedule[0].starts_at, '%d, %DD.%MM.%YYYY')}
		</SubHeadline>
		<div class="day">
			{#each schedule as talk}
				<ScheduleEntry speaker={getSpeakerById(talk.speaker_id)} {talk} {personPopupCallback} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.schedule-element {
		margin-bottom: 3rem;
	}

	.schedule-element :global(.subheadline-schedule) {
		border-bottom: 1px solid var(--text-color);
		margin-bottom: 2rem;
		padding-bottom: 0.2rem;
	}

	.day {
		display: grid;
		grid-template-columns: 10rem 1fr;
		row-gap: 2rem;
		margin: 0 2rem;
	}
</style>
