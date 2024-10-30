<script lang="ts">
	import type { Person, Talk } from 'types/provideTypes';

	import ScheduleEntry from './scheduleEntry.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	import { error } from '@sveltejs/kit';
	import { formatDate } from 'helper/dates';

	export let speakers: Person[];
	export let schedule: Talk[];
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
			<!-- only using first element here because all elements should be the same by now -->
			<SubHeadline>Bonusinhalte auf Youtube:</SubHeadline>
		{/if}
		<SubHeadline classes="schedule-element-sub-headline-schedule">
			<!-- only using first element here because all elements should be the same by now -->
			{formatDate(schedule[0].starts_at, '%d, %DD.%MM.%YYYY')}
		</SubHeadline>
		<div class="schedule-element-day">
			{#each schedule as talk}
				<ScheduleEntry speaker={getSpeakerById(talk.speaker_id)} {talk} {personPopupCallback} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.schedule-element {
		margin-bottom: var(--2x-margin);
	}

	:global(.schedule-element-sub-headline-schedule) {
		border-bottom: 1px solid var(--text-color);
		margin-bottom: var(--2x-margin);
		padding-bottom: var(--quad-padding);
	}

	.schedule-element-day {
		display: grid;
		grid-template-columns: 16rem 1fr;
		row-gap: var(--2x-gap);
		margin: 0 var(--2x-margin) var(--4x-margin);
	}

	@media (max-width: 600px) {
			.schedule-element-day {
					grid-template-columns: 8rem 1fr;
			}
  }
</style>
