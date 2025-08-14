<script lang="ts">
    import type {Person, Talk} from 'types/provideTypes';

    import ScheduleTag from './scheduleTag.svelte';
    import ScheduleSpeaker from './scheduleSpeaker.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import StyledLink from 'elements/input/styledLink.svelte'

    import {formatDate} from 'helper/dates';

    export let personPopupCallback: (event: Event, person: Person) => void;
    export let speaker: Person;
    export let talk: Talk;
</script>

<div class="schedule-entry-time-wrapper schedule-entry-horizontal-line">
    <SubHeadline classes="schedule-entry-time">{formatDate(talk.starts_at, '%hh:%mm Uhr')}</SubHeadline>
    {#if talk.youtube_url}
        <StyledLink
                classes="transparent-background"
                textClasses="hide-text-on-mobile"
                icon="YouTube"
                text="YouTube"
                href={talk.youtube_url}
                title="Klicke hier, um zu dem YouTube-Video dieses Talks zu gelangen"
                iconClasses="text-color-only"
        />
    {/if}
</div>
<div itemprop="subEvent"
     itemscope
     itemtype="https://schema.org/Event"
     class="schedule-entry-entry-wrapper schedule-entry-horizontal-line">
    <meta itemprop="startDate" content={talk.starts_at}/>
    <meta itemprop="duration" content={`PT${talk.duration}M`}/>
    <meta itemprop="description" content={talk.description}/>
    <meta itemprop="isAccessibleForFree" content="true"/>
    <meta itemprop="url" content={talk.youtube_url}/>
    <div class="schedule-entry-title-wrapper">
        <SubHeadline>{talk.title}</SubHeadline>
        <div class="schedule-entry-tag-wrapper">
            {#each talk.tags as tag}
                <ScheduleTag {tag}/>
                <meta itemprop="keywords" content={tag.text}/>
            {/each}
        </div>
        <meta itemprop="name" content={talk.title}/>
    </div>
    <div class="schedule-entry-speaker-wrapper">
        <div hidden aria-hidden="true"
             itemprop="performer"
             itemscope
             itemtype="https://schema.org/Person">
            <meta itemprop="name" content={speaker.name}/>
            <meta itemprop="description" content={speaker.short_bio}/>
            <meta itemprop="description" content={speaker.bio}/>
            {#each speaker.social_media_links as link}
                <meta itemprop="url" content={link.url}/>
            {/each}
        </div>
        {#if talk.guests.length > 0}
            <TextLine classes="schedule-entry-speaker-text">Moderation:</TextLine>

        {/if}
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
                <div hidden aria-hidden="true"
                     itemprop="contributor"
                     itemscope
                     itemtype="https://schema.org/Person">
                    <meta itemprop="name" content={guest.name}/>
                    <meta itemprop="description" content={guest.short_bio}/>
                    <meta itemprop="description" content={guest.bio}/>
                    {#each guest.social_media_links as link}
                        <meta itemprop="url" content={link.url}/>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
    <Paragraph classes="schedule-entry-speaker-description">{talk.description}</Paragraph>
</div>

<style>
    .schedule-entry-time-wrapper {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: var(--quad-gap);
    }

    .schedule-entry-horizontal-line {
        border-bottom: 1px solid var(--primary-color-dark);
        padding-bottom: var(--2x-padding);
    }

    .schedule-entry-entry-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--full-gap);
    }

    .schedule-entry-title-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;

    }

    .schedule-entry-tag-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: end;
        gap: var(--full-gap);
        flex-wrap: wrap;
    }

    :global(.schedule-entry-time) {
        margin-left: var(--full-margin);
    }

    .schedule-entry-speaker-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
        flex-wrap: wrap;
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

        .schedule-entry-tag-wrapper {
            justify-content: start;
        }
    }

    @media (max-width: 600px) {
        :global(.schedule-entry-time) {
            margin-left: 0;
        }
    }
</style>
