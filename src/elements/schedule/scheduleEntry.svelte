<script lang="ts">
    import type {Person, Talk} from 'types/provideTypes';

    import ScheduleTag from './scheduleTag.svelte';
    import ScheduleSpeaker from './scheduleSpeaker.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';

    import {formatDate} from 'helper/dates';

    export let personPopupCallback: (event: Event, person: Person) => void;
    export let speaker: Person;
    export let talk: Talk;
</script>

<div class="schedule-entry-horizontal-line">
    <SubHeadline classes="schedule-entry-time">{formatDate(talk.starts_at, '%hh:%mm Uhr')}</SubHeadline>
</div>
<div class="schedule-entry-entry-wrapper schedule-entry-horizontal-line">
    <div class="schedule-entry-title-wrapper">
        <SubHeadline>{talk.title}</SubHeadline>
        <div class="schedule-entry-tag-wrapper">
            {#each talk.tags as tag}
                <ScheduleTag {tag}/>
            {/each}
        </div>
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
    .schedule-entry-horizontal-line {
        border-bottom:  1px solid var(--text-color);
        padding-bottom: var(--2x-padding);
    }

    .schedule-entry-entry-wrapper {
        display:        flex;
        flex-direction: column;
        align-items:    flex-start;
    }

    .schedule-entry-title-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);

    }

    .schedule-entry-tag-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }

    :global(.schedule-entry-time) {
        margin-left: var(--full-margin);
    }

    @media (max-width: 1280px) {
        .schedule-entry-title-wrapper {
            flex-direction: column;
            margin-bottom:  var(--2x-margin);
        }
    }

    @media (max-width: 600px) {
        .schedule-entry-tag-wrapper {
            flex-direction: column;
        }

        :global(.schedule-entry-time) {
            margin-left: 0;
        }
    }
</style>
