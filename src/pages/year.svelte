<script lang="ts">
    import * as Menu from 'menu/page';
    import * as MenuItemPage from 'menu/pageItems';
    import * as MenuItemDashboard from 'menu/dashboardItems';

    import type {LoadYear} from 'types/loadTypes';
    import type {Person, Talk} from 'types/provideTypes';

    import LogoBig from 'elements/image/logoBig.svelte';
    import YearEventLinks from 'elements/input/yearEventLinks.svelte';
    import PersonArray from 'elements/person/personGrid.svelte';
    import HeadlineH2 from 'elements/text/headlineH2.svelte';
    import Headline from 'elements/text/headline.svelte';
    import PersonPopup from 'elements/person/personPopup.svelte';
    import Section from 'elements/section/section.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import SponsorArray from 'elements/sponsor/sponsorArray.svelte';
    import Schedule from 'elements/schedule/schedule.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Link from 'elements/text/link.svelte';
    import Video from 'elements/image/video.svelte';

    import {formatDate} from 'helper/dates';
    import {apiUrl} from 'helper/links';

    export let data: LoadYear;

    type ScheduleDay = {
        normal: Talk[];
        special: Talk[];
    };

    let personPopup: PersonPopup;

    function openPersonPopup(_: Event, person: Person) {
        personPopup.show(person);
    }

    function closePersonPopup(): void {
        personPopup.hide();
    }


    function lastEventLink(): string {
        const currentIndex = data.globals.years_with_events.indexOf(data.year.event.year);
        if (currentIndex === -1) { // no element found. displays main-page then.
            console.error(`current year '${data.year.event.year}' not in the globals array`);
            return '';
        }
        if (currentIndex >= data.globals.years_with_events.length - 1) { // no previous year in the array. displays main-page then.
            console.error(`no previous year for current year '${data.year.event.year}' not in a globals array`);
            return '';
        }


        return `/year/${data.globals.years_with_events[currentIndex + 1]}`;
    }

    function splitTalks(): ScheduleDay[] {
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
            const date = formatDate(talk.starts_at, '%DD.%MM.%YYYY');
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

<PageWrapper
        headerMenu={data.loggedIn ?
         data.year.event.is_visible_on_frontpage ? Menu.headerMainLoggedIn : Menu.getHeaderMenuForLoggedInHiddenEvent(lastEventLink()) :
         data.year.event.is_visible_on_frontpage ?  Menu.headerMainLoggedOut : Menu.getHeaderMenuForLoggedOutHiddenEvent(lastEventLink())}
        footerMenu={data.loggedIn ? Menu.footerLoggedIn : Menu.footerLoggedOut}
        globals={data.globals}
        itemtype="https://schema.org/EducationEvent">

    <div class="year-header">
        <div class="year-header-content">
            <LogoBig classes="year-logo-big"/>

            <div class="year-header-text-wrapper">
                <Headline itemprop="name" classes="headline-green headline-left">{data.year.event.title}</Headline>
                <SubHeadline
                        dateProps={[
                            {prop: "startDate", content: data.year.event.start_date },
                            {prop: "endDate", content: data.year.event.end_date },
                            ]}
                        classes="year-header-sub-headline sub-headline-white">
                    Online-Konferenz {formatDate(data.year.event.start_date, '%DD.%MM.')}
                    - {formatDate(data.year.event.end_date, '%DD.%MM.%YYYY')}
                </SubHeadline>
                <Paragraph itemprop="alternateName" classes="year-header-subtitle paragraph-white">
                    {data.year.event.subtitle}
                </Paragraph>
                <YearEventLinks useItemProps={true} {data}/>
            </div>
        </div>
    </div>
    <div class="year-content-wrapper">
        {#if data.year.event.trailer_url
        && data.year.event.trailer_poster_url
        && data.year.event.trailer_subtitles_url}
            <Section id="Trailer">
                <div class="year-video-wrapper">
                    <Video ariaLabel="{data.year.event.title} - Trailer}"
                           videoPath={data.year.event.trailer_url}
                           picturePath={data.year.event.trailer_poster_url}
                           captionPath={data.year.event.trailer_subtitles_url}
                    />
                </div>
            </Section>
        {/if}

        <Section id="Description">
            <HeadlineH2 classes="headline-h2-border">{data.year.event.description_headline}</HeadlineH2>
            <div class="year-description-wrapper">
                <div class="year-description-text-wrapper">
                    <Paragraph itemprop="description" classes="year-discription-paragraph paragraph-pre-wrap"
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
                            vom {formatDate(
                            data.year.event.call_for_papers_start,
                            '%DD.%MM.'
                        )} bis {formatDate(data.year.event.call_for_papers_end, '%DD.%MM.%YYYY')}
                        {/if}
                        als Speaker bewerben und einen Vortrag einreichen.<br/>
                        {#if data.loggedIn}
                            Bewirb dich im
                            <Link classes="link-inline"
                                  href={MenuItemDashboard.userApplication.url}
                                  title={MenuItemDashboard.userApplication.description}>User-Dashboard
                            </Link>
                            als Speaker.<br/><br/> Du bist bereits Speaker?<br/> Dann kannst du im
                            <Link classes="link-inline"
                                  href={MenuItemDashboard.speakerApplication.url}
                                  title={MenuItemDashboard.speakerApplication.description}>Speaker-Dashboard
                            </Link>
                            einen Talk einreichen.
                        {:else}
                            <Link classes="link-inline"
                                  href={MenuItemPage.login.url}
                                  title={MenuItemPage.login.description}>Melde dich dafür an
                            </Link>
                            oder
                            <Link classes="link-inline"
                                  href={MenuItemPage.register.url}
                                  title={MenuItemPage.register.description}>registriere
                            </Link>
                            einen neuen Account.
                        {/if}
                        <br/><br/>Oder schau dir in der Zwischenzeit
                        <Link classes="link-inline"
                              href={lastEventLink()}
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
                        <PersonArray itemProp="performer"
                                     personData={data.year.speakers}
                                     personPopupCallback={openPersonPopup}/>
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
                        <PersonArray itemProp="organizer"
                                     personData={data.year.team_members}
                                     personPopupCallback={openPersonPopup}/>
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
                                href={apiUrl(`/events/${data.year.event.year}/ics`)}
                                title="Klicke, um den Ablaufplan als ICS-Datei herunterzuladen"
                                icon="Calender"
                                newTab={false}
                                text="Verpasse keinen Vortrag und hole dir jetzt alle Termine in deinen Kalender. Klicke hier!"
                        />
                    </div>
                    <div class="year-section-inner">
                        {#each splitTalks() as days}
                            <Schedule
                                    schedule={days.normal}
                                    speakers={data.year.speakers}
                                    personPopupCallback={openPersonPopup}
                            />
                            <Schedule
                                    schedule={days.special}
                                    speakers={data.year.speakers}
                                    personPopupCallback={openPersonPopup}
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
</PageWrapper>

<PersonPopup bind:this={personPopup}
             on:click={closePersonPopup}/>

<style>
    .year-header {
        width: 100%;
        position: relative;
        background-image: url('/background.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: fit-content;
    }

    .year-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.02) 30%,
                rgba(0, 0, 0, 0.2) 100%
        );
        pointer-events: none;
    }

    .year-header-content {
        position: relative;
        z-index: 1;
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
