<script lang="ts">
    import type { Person, Talk } from 'types/provideTypes';

    import ScheduleTag from './scheduleTag.svelte';
    import ScheduleSpeaker from './scheduleSpeaker.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    import { formatDate } from 'helper/dates';

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
                <ScheduleTag {tag} />
            {/each}
        </div>
    </div>
    <div class="schedule-entry-speaker-wrapper">
        <ScheduleSpeaker
              {speaker}
              on:click={(event) => {
			personPopupCallback(event, speaker);
		}}
        />
        {#if talk.guests.length > 0}
            <TextLine classes="schedule-entry-speaker-text">|</TextLine>
            <TextLine classes="schedule-entry-speaker-text">Gäste:</TextLine>
            {#each talk.guests as guest}
                <ScheduleSpeaker
                      speaker={guest}
                      on:click={(event) => {personPopupCallback(event, guest);}}
                />
            {/each}
        {/if}
    </div>
    <Paragraph classes="schedule-entry-speaker-description">{talk.description}</Paragraph>
</div>

<style>
    .schedule-entry-horizontal-line {
        border-bottom:  1px solid var(--primary-color-dark);
        padding-bottom: var(--2x-padding);
    }

    .schedule-entry-entry-wrapper {
        display:        flex;
        flex-direction: column;
        align-items:    flex-start;
        gap:            var(--full-gap);
    }

    .schedule-entry-title-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: space-between;
        width:           100%;

    }

    .schedule-entry-tag-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
        flex-wrap:      wrap;
    }

    :global(.schedule-entry-time) {
        margin-left: var(--full-margin);
    }

    .schedule-entry-speaker-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
        flex-wrap:      wrap;
    }

    :global(.schedule-entry-speaker-text) {
        align-self: center;
    }

    :global(.schedule-entry-speaker-description) {
        margin-top: var(--full-margin);
    }

    @media (max-width: 1280px) {
        .schedule-entry-title-wrapper {
            flex-direction: column;
            gap: var(--full-gap);
        }
    }

    @media (max-width: 600px) {
        :global(.schedule-entry-time) {
            margin-left: 0;
        }
    }
</style>
