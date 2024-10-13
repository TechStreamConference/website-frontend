<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';
	import type { Person, Talk } from 'types/provideTypes';
	import ScheduleTag from './scheduleTag.svelte';
	import ScheduleSpeaker from './scheduleSpeaker.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	export let speaker: Person;
	export let talk: Talk;
</script>

<TextLine>{talk.starts_at}</TextLine>
<div class="entry-wrapper schedule-entry">
	<div class="title-wrapper">
		<SubHeadline classes="subheadline-entry">{talk.title}</SubHeadline>
		{#each talk.tags as tag}
			<ScheduleTag {tag} />
		{/each}
	</div>
	<ScheduleSpeaker {speaker} />
	<p>{talk.description}</p>
</div>

<style>
	.entry-wrapper {
		display: flex;
		flex-direction: column;
	}

	.title-wrapper {
		display: flex;
		flex-direction: row;
	}

    .schedule-entry :global(.subheadline-entry){
        margin-right: 1rem;
    }
</style>
