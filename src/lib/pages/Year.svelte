<script lang="ts">
    import * as MenuItem from "@/config/menuItem";
    import type {LoadYear} from '@/types/loadTypes';
    import type {Person, Talk} from '@/types/provideTypes';

    import LogoBig from '@/lib/assets/LogoBig.svelte';
    import YearEventLinks from '@/lib/interact/YearEventLinks.svelte';
    import PersonArray from '@/lib/default/PersonGrid.svelte';
    import HeadlineH2 from '@/lib/text/HeadlineH2.svelte';
    import Headline from '@/lib/text/Headline.svelte';
    import PersonPopup from '@/lib/popup/PersonPopup.svelte';
    import Section from '@/lib/default/Section.svelte';
    import SubHeadline from '@/lib/text/SubHeadline.svelte';
    import YouTubeVideo from '@/lib/assets/YouTubeVideo.svelte';
    import Paragraph from '@/lib/text/Paragraph.svelte';
    import SponsorArray from '@/lib/default/SponsorArray.svelte';
    import Schedule from '@/lib/default/Schedule.svelte';
    import StyledLink from '@/lib/interact/StyledLink.svelte';
    import TextLine from '@/lib/text/TextLine.svelte';
    import Link from '@/lib/text/Link.svelte';

    import {format_date} from '@/helper/dates';
    import {api_url} from '@/helper/links';

    export let data: LoadYear;

    type ScheduleDay = {
        normal: Talk[];
        special: Talk[];
    };

    let person_popup: PersonPopup;

    function open_person_popup(_: Event, person: Person) {
        person_popup.show(person);
    }

    function close_person_popup(): void {
        person_popup.hide();
    }


    function last_event_link(): string {
        const currentIndex = data.globals.years_with_events.indexOf(data.year.event.year);
        if (currentIndex === -1) { // no element found. displays main-page then.
            console.error(`current year '${data.year.event.year}' not in globals array`);
            return '';
        }
        if (currentIndex >= data.globals.years_with_events.length - 1) { // no previous year in the array. displays main-page then.
            console.error(`no previous year for current year '${data.year.event.year}' not in globals array`);
            return '';
        }


        return `/year/${data.globals.years_with_events[currentIndex + 1]}`;
    }

    function split_talks(): ScheduleDay[] {
        // no sorting here because database returns the data already sorted. So just splitting here.
        const talks: Talk[] = data.year.talks;
        let dict: {
            [key: string]: ScheduleDay
        } = {};
        const newDays = (): ScheduleDay => {
            return {
                normal: [],
                special: [],
            };
        };

        for (let talk of talks) {
            const date = format_date(talk.starts_at, '%DD.%MM.%YYYY');
            if (!dict[date]) {
                dict[date] = newDays();
            }

            if (talk.is_special) {
                dict[date].special.push(talk);
            } else {
                dict[date].normal.push(talk);
            }
        }

        return Object.values(dict);
    }
</script>

<div class="year-header">
    <div class="year-header-content">
        <LogoBig classes="year-logo-big"/>

        <div class="year-header-text-wrapper">
            <Headline classes="headline-green headline-left">{data.year.event.title}</Headline>
            <SubHeadline classes="year-header-sub-headline sub-headline-white">
                Online-Konferenz {format_date(data.year.event.start_date, '%DD.%MM.')}
                - {format_date(data.year.event.end_date, '%DD.%MM.%YYYY')}
            </SubHeadline>
            <Paragraph classes="year-header-subtitle paragraph-white">
                {data.year.event.subtitle}
            </Paragraph>
            <YearEventLinks {data}/>
        </div>
    </div>
</div>
<div class="year-content-wrapper">
    {#if data.year.event.trailer_youtube_id}
        <Section id="Trailer">
            <div class="year-video-wrapper">
                <YouTubeVideo
                        id={data.year.event.trailer_youtube_id}
                        title="Tech Stream Conference Trailer {data.year.event.year}"
                />
            </div>
        </Section>
    {/if}

    <Section id="Description">
        <HeadlineH2 classes="headline-h2-border">{data.year.event.description_headline}</HeadlineH2>
        <div class="year-description-wrapper">
            <div class="year-description-text-wrapper">
                <Paragraph classes="year-discription-paragraph paragraph-pre-wrap"
                >{data.year.event.description}</Paragraph>
                <YearEventLinks {data}/>
            </div>
            <LogoBig classes="year-logo-big"/>
        </div>
    </Section>

    {#if !data.year.event.is_visible_on_frontpage}
        <Section>
            <div class="year-section-inner">
                <HeadlineH2 classes="headline-h2-border">Noch in Planung</HeadlineH2>
                <Paragraph --text-align="center">
                    Wir sind gerade mitten in der Planung des nächsten Events.<br/>
                    Du kannst dich
                    {#if data.year.event.call_for_papers_start && data.year.event.call_for_papers_end}
                        vom {format_date(
                        data.year.event.call_for_papers_start,
                        '%DD.%MM.'
                    )} bis {format_date(data.year.event.call_for_papers_end, '%DD.%MM.%YYYY')}
                    {/if}
                    als Speaker bewerben und einen Vortrag einreichen.<br/>
                    {#if data.loggedIn}
                        Bewirb dich im
                        <Link classes="link-inline"
                              href={MenuItem.user_application_item.path}
                              title={MenuItem.user_application_item.aria}>User-Dashboard
                        </Link>
                        als Speaker.<br/><br/> Du bist bereits Speaker?<br/> Dann kannst du im
                        <Link classes="link-inline"
                              href={MenuItem.speaker_application_item.path}
                              title={MenuItem.speaker_application_item.aria}>Speaker-Dashboard
                        </Link>
                        einen Talk einreichen.
                    {:else}
                        <Link classes="link-inline"
                              href={MenuItem.login_item.path}
                              title={MenuItem.login_item.aria}>Melde dich dafür an
                        </Link>
                        oder
                        <Link classes="link-inline"
                              href={MenuItem.register_item.path}
                              title={MenuItem.register_item.aria}>registriere
                        </Link>
                        einen neuen Account.
                    {/if}
                    <br/><br/>Oder schau dir in der Zwischenzeit
                    <Link classes="link-inline"
                          href={last_event_link()}
                          title="Klicke hier, um dir die Hauptseite des letzten Events anzeigen zu lassen">
                        unser letztes Event
                    </Link>
                    an.
                </Paragraph>
            </div>
        </Section>
    {/if}

    {#if data.year.event.is_visible_on_frontpage}
        <Section id="Speaker">
            <HeadlineH2 classes="headline-h2-border">Vortragende</HeadlineH2>
            <div class="year-section-inner">
                {#if data.year.speakers.length > 0}
                    <PersonArray person_data={data.year.speakers}
                                 person_popup_callback={open_person_popup}/>
                {:else}
                    <TextLine classes="text-line-center">Sei gespannt, welche Speaker in den nächsten Tagen hier auf
                        dich warten.
                    </TextLine>
                {/if}
            </div>
        </Section>
    {/if}

    {#if data.year.sponsors.length > 0}
        <Section id="Sponsors">
            <HeadlineH2 classes="headline-h2-border">Sponsoren</HeadlineH2>
            <div class="year-section-inner">
                <SponsorArray logos={data.year.sponsors}/>
            </div>
        </Section>
    {/if}

    {#if data.year.media_partners.length > 0}
        <Section>
            <HeadlineH2 classes="headline-h2-border">Medienpartner</HeadlineH2>
            <div class="year-section-inner">
                <SponsorArray logos={data.year.media_partners}/>
            </div>
        </Section>
    {/if}

    {#if data.year.event.is_visible_on_frontpage}
        <Section id="Team">
            <HeadlineH2 classes="headline-h2-border">Team</HeadlineH2>
            <div class="year-section-inner">
                {#if data.year.team_members.length > 0}
                    <PersonArray person_data={data.year.team_members}
                                 person_popup_callback={open_person_popup}/>
                {:else}
                    <TextLine classes="text-line-center">Sei gespannt welche, Team Member in den nächsten Tagen hier
                        auf dich warten.
                    </TextLine>
                {/if}
            </div>
        </Section>
    {/if}

    {#if data.year.event.is_visible_on_frontpage}
        <Section id="Schedule">
            <HeadlineH2 classes="headline-h2-border">Plan</HeadlineH2>
            {#if data.year.talks.length > 0}
                <div class="center-styled-link">
                    <StyledLink
                            classes="styled-link-white"
                            href={api_url(`/events/${data.year.event.year}/ics`)}
                            title="Klicke, um den Ablaufplan als ICS-Datei herunterzuladen"
                            icon="Calender"
                            new_tab={false}
                            text="Verpasse keinen Vortrag und hole dir jetzt alle Termine in deinen Kalender. Klicke hier!"
                    />
                </div>
                <div class="year-section-inner">
                    {#each split_talks() as days}
                        <Schedule
                                schedule={days.normal}
                                speakers={data.year.speakers}
                                person_popup_callback={open_person_popup}
                        />
                        <Schedule
                                schedule={days.special}
                                speakers={data.year.speakers}
                                person_popup_callback={open_person_popup}
                        />
                    {/each}
                </div>
            {:else}
                <div class="year-section-inner">
                    <TextLine classes="text-line-center">Sei gespannt, welche Vorträge in den nächsten Tagen hier
                        auf dich warten.
                    </TextLine>
                </div>
            {/if}
        </Section>
    {/if}
</div>

<PersonPopup bind:this={person_popup}
             on:click={close_person_popup}/>

<style>
    .year-header {
        width: 100%;
        background-image: url('@/assets/background.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: fit-content;
    }

    .year-header-content {
        justify-content: center;
        margin: var(--8x-margin) var(--4x-margin);
        display: flex;
    }

    :global(.year-logo-big) {
        height: 18rem;
    }

    .year-header-text-wrapper {
        margin-left: var(--2x-margin);
    }

    :global(.year-header-sub-headline) {
        padding-bottom: var(--full-padding);
        border-bottom: 1px solid var(--secondary-color);
    }

    :global(.year-header-subtitle) {
        margin: var(--2x-margin) 0 var(--full-margin);
    }

    .year-description-wrapper {
        display: flex;
        flex-direction: row;
        margin-top: var(--2x-margin);
    }

    .year-description-text-wrapper {
        display: flex;
        flex-direction: column;
        margin-right: var(--2x-margin);
        flex-grow: 1;
    }

    :global(.year-discription-paragraph) {
        margin: var(--2x-margin) 0;
    }

    .year-content-wrapper {
        flex-grow: 1;
        max-width: 150rem;
        width: 100%;
        margin: 0 auto 10rem;
        padding: 0 var(--2x-padding);
    }

    .year-section-inner {
        margin-top: var(--2x-margin);
        display: flex;
        flex-direction: column;
        gap: var(--4x-gap);
    }

    .year-video-wrapper {
        margin: var(--2x-margin);
        width: calc(100% - 4rem);
        height: auto;
    }

    .center-styled-link {
        text-align: center;
        margin-top: var(--2x-margin);
    }

    @media (max-width: 1280px) {
        :global(.year-logo-big) {
            display: none;
        }

        .year-header-text-wrapper {
            margin-left: 0;
        }

        .year-description-text-wrapper {
            margin-right: 0;
        }

        .year-video-wrapper {
            margin: var(--full-margin);
            width: calc(100% - 2rem);
        }
    }

    @media (max-width: 600px) {
        .year-video-wrapper {
            margin: 0;
            width: 100%;
        }
    }
</style>
