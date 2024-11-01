<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	import type { Person, Talk } from 'types/provideTypes';

	import * as Menu from 'menu/year';
	import LogoBig from 'elements/image/logoBig.svelte';
	import YearEventLinks from 'elements/input/yearEventLinks.svelte';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import PersonArray from 'elements/person/personGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import Headline from 'elements/text/headline.svelte';
	import PersonPopup from 'elements/person/personPopup.svelte';
	import Section from 'elements/section/section.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import YouTubeVideo from 'elements/image/youTubeVideo.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SponsorArray from 'elements/sponsor/sponsorArray.svelte';
	import Schedule from 'elements/schedule/schedule.svelte';
	import LinkWithIcon from 'elements/input/linkWithIcon.svelte';

	import { formatDate } from 'helper/dates';
	import { apiUrl } from 'helper/links';

	export let data: LoadYear;

	type ScheduleDay = {
		normal: Talk[];
		special: Talk[];
	};

	let personPopup: Person | undefined = undefined;
	function openPersonPopup(event: Event, person: Person) {
		personPopup = person;
	}

	function closePersonPopup(): void {
		personPopup = undefined;
	}

	function splitTalks(): ScheduleDay[] {
		// no sorting here because database returns the data already sorted. So just splitting here.
		const talks: Talk[] = data.year.talks;
		let dict: { [key: string]: ScheduleDay } = {};
		const newDays = (): ScheduleDay => {
			return { normal: [], special: [] };
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

<Header menu={data.loggedIn ? Menu.headerIn : Menu.headerOut} />
<div class="year">
	<div class="year-header">
		<div class="year-header-content">
			<LogoBig classes="year-logo-big" />

			<div class="year-header-text-wrapper">
				<Headline classes="headline-green headline-left">{data.year.event.title}</Headline>
				<SubHeadline classes="year-header-sub-headline sub-headline-white">
					Online-Konferenz {formatDate(data.year.event.start_date, '%DD.%MM.')}
					- {formatDate(data.year.event.end_date, '%DD.%MM.%YYYY')}
				</SubHeadline>
				<SubHeadline classes="year-header-subtitle sub-headline-white">
					{data.year.event.subtitle}
				</SubHeadline>
				<YearEventLinks {data} />
			</div>
		</div>
	</div>
	<div class="year-content-wrapper">
		<Section id="Trailer">
			<div class="year-video-wrapper">
				<YouTubeVideo
					id={data.year.event.trailer_youtube_id}
					title="Tech Stream Conference Trailer {data.year.event.year}"
				/>
			</div>
		</Section>

		<Section id="Description">
			<HeadlineH2 classes="headline-h2-border">{data.year.event.description_headline}</HeadlineH2>
			<div class="year-description-wrapper">
				<div class="year-discription-text-wrapper">
					<Paragraph classes="year-discription-paragraph paragraph-pre-wrap"
						>{data.year.event.description}</Paragraph
					>
					<YearEventLinks {data} />
				</div>
				<LogoBig classes="year-logo-big" />
			</div>
		</Section>

		<Section id="Speaker">
			<HeadlineH2 classes="headline-h2-border">Vortragende</HeadlineH2>
			<div class="year-section-inner">
				<PersonArray personData={data.year.speakers} personPopupCallback={openPersonPopup} />
			</div>
		</Section>

		<Section id="Sponsors">
			<HeadlineH2 classes="headline-h2-border">Sponsoren</HeadlineH2>
			<div class="year-section-inner">
				<SponsorArray logos={data.year.sponsors} />
			</div>
		</Section>

		<Section>
			<HeadlineH2 classes="headline-h2-border">Medienpartner</HeadlineH2>
			<div class="year-section-inner">
				<SponsorArray logos={data.year.media_partners} />
			</div>
		</Section>

		<Section id="Team">
			<HeadlineH2 classes="headline-h2-border">Team</HeadlineH2>
			<div class="year-section-inner">
				<PersonArray personData={data.year.team_members} personPopupCallback={openPersonPopup} />
			</div>
		</Section>

		<Section id="Schedule">
			<HeadlineH2 classes="headline-h2-border">Plan</HeadlineH2>
			<LinkWithIcon
				href={apiUrl(`/api/events/${data.year.event.year}/ics`)}
				title="Klicke um den Ablaufplan als ICS-Datei herunter zu laden"
				icon="Calender"
				newTab={false}
			>
				Verpasse keinen Vortrag und hole dir jetzt alle Termine in deinen Kalendar. Klick hier
			</LinkWithIcon>
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
		</Section>
	</div>
	<Footer globals={data.globals} menu={data.loggedIn ? Menu.footerIn : Menu.footerOut} />
</div>

{#if personPopup}
	<PersonPopup data={personPopup} on:click={closePersonPopup} />
{/if}

<style>
	.year {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.year-header {
		width: 100vw;
		background-image: url('/background.png');
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

	.year-discription-text-wrapper {
		display: flex;
		flex-direction: column;
		margin-right: var(--2x-margin);
	}

	:global(.year-discription-paragraph) {
		margin: var(--2x-margin) 0;
	}

	.year-content-wrapper {
		flex-grow: 1;
		max-width: 150rem;
		margin: 0 auto 10rem;
		padding: 0 var(--2x-padding);
	}

	.year-section-inner {
		margin-top: var(--2x-margin);
	}

	.year-video-wrapper {
		margin: var(--2x-margin);
		width: calc(100% - 4rem);
		height: auto;
	}

	@media (max-width: 1280px) {
		:global(.year-logo-big) {
			display: none;
		}

		.year-header-text-wrapper {
			margin-left: 0;
		}

		.year-discription-text-wrapper {
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
