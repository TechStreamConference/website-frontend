<script lang="ts">
	import type { Person, Talk } from 'types/provideTypes';
	import ScheduleTag from './scheduleTag.svelte';
	import ScheduleSpeaker from './scheduleSpeaker.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import { formatDate } from 'helper/dates';

	export let personPopupCallback: (event: Event, person: Person) => void;

	export let speaker: Person;
	export let talk: Talk;
</script>

<div class="horizontal-line">
	<SubHeadline classes="time">{formatDate(talk.starts_at, '%hh:%mm Uhr')}</SubHeadline>
</div>
<div class="entry-wrapper schedule-entry horizontal-line">
	<div class="title-wrapper">
		<SubHeadline classes="subheadline-entry">{talk.title}</SubHeadline>
		{#each talk.tags as tag}
			<ScheduleTag {tag} />
		{/each}
	</div>
	<ScheduleSpeaker
		{speaker}
		on:click={(event) => {
			personPopupCallback(event, speaker);
		}}
	/>
	<Paragraph>{talk.description}</Paragraph>
</div>

<style>
	.horizontal-line {
		border-bottom: 1px solid var(--text-color);
		padding-bottom: var(--2x-padding);
	}
	.entry-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.title-wrapper {
		display: flex;
		flex-direction: row;
	}

	.schedule-entry :global(.subheadline-entry) {
		margin-right: var(--full-margin);
	}

	.horizontal-line :global(.time) {
		margin-left: var(--full-margin);
	}
</style>
