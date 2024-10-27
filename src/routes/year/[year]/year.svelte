<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	export let data: LoadYear;
	import * as Menu from 'menu/year';

	import LogoBig from 'elements/image/logoBig.svelte';
	import { formatDate } from 'helper/dates';

	import YearEventLinks from 'elements/input/yearEventLinks.svelte';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import PersonArray from 'elements/person/personGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Person, Talk } from 'types/provideTypes';
	import PersonPopup from 'elements/person/personPopup.svelte';
	import Section from 'elements/section/section.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import YouTubeVideo from 'elements/image/youTubeVideo.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SponsorArray from 'elements/sponsor/sponsorArray.svelte';

	import Schedule from 'elements/schedule/schedule.svelte';

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
		// no sorting here because database returnes the data already sorted. So just splitting here.
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
<div class="page page-year">
	<div class="header">
		<div class="header-content">
			<LogoBig classes="logo-big" />

			<div class="header-text-wrapper">
				<Headline classes="green left">{data.year.event.title}</Headline>
				<SubHeadline classes="subheadline white">
					Online-Konferenz {formatDate(data.year.event.start_date, '%DD.%MM.')}
					- {formatDate(data.year.event.end_date, '%DD.%MM.%YYYY')}
				</SubHeadline>
				<SubHeadline classes="subtitle white">{data.year.event.subtitle}</SubHeadline>
				<YearEventLinks {data} />
			</div>
		</div>
	</div>
	<div class="content-wrapper">
		<Section id="Trailer">
			<div class="video-wrapper">
				<YouTubeVideo
					id={data.year.event.trailer_youtube_id}
					title="Tech Stream Conference Trailer {data.year.event.year}"
				/>
			</div>
		</Section>

		<Section id="Discription">
			<HeadlineH2 classes="border">{data.year.event.description_headline}</HeadlineH2>
			<div class="discription-wrapper">
				<div class="discription-text-wrapper">
					<Paragraph classes="discription-paragraph pre-wrap"
						>{data.year.event.description}</Paragraph
					>
					<YearEventLinks {data} />
				</div>
				<LogoBig classes="logo-big" />
			</div>
		</Section>

		<Section id="Speaker">
			<HeadlineH2 classes="border">Vortragende</HeadlineH2>
			<div class="section-inner">
				<PersonArray personData={data.year.speakers} personPopupCallback={openPersonPopup} />
			</div>
		</Section>

		<Section id="Sponsors">
			<HeadlineH2 classes="border">Sponsoren</HeadlineH2>
			<div class="section-inner">
				<SponsorArray logos={data.year.sponsors} />
			</div>
		</Section>

		<Section>
			<HeadlineH2 classes="border">Medienpartner</HeadlineH2>
			<div class="section-inner">
				<SponsorArray logos={data.year.media_partners} />
			</div>
		</Section>

		<Section id="Team">
			<HeadlineH2 classes="border">Team</HeadlineH2>
			<div class="section-inner">
				<PersonArray personData={data.year.team_members} personPopupCallback={openPersonPopup} />
			</div>
		</Section>

		<Section id="Shedule">
			<HeadlineH2 classes="border">Plan</HeadlineH2>
			<div class="section-inner">
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
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.header {
		width: 100vw;
		background-image: url('/background.png');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		height: fit-content;
	}

	.header-content {
		justify-content: center;
		margin: var(--8x-margin) var(--4x-margin);
		display: flex;
	}

	.page-year :global(.logo-big) {
		height: 18rem;
	}

	.header-text-wrapper {
		margin-left: var(--2x-margin);
	}

	.page-year :global(.subheadline) {
		padding-bottom: var(--full-padding);
		border-bottom: 1px solid var(--secondary-color);
	}

	.page-year :global(.subtitle) {
		margin: var(--2x-margin) 0 var(--full-margin);
	}

	.discription-wrapper {
		display: flex;
		flex-direction: row;
		margin-top: var(--2x-margin);
	}

	.discription-text-wrapper {
		display: flex;
		flex-direction: column;
		margin-right: var(--2x-margin);
	}

	.page-year :global(.discription-paragraph) {
		margin: var(--2x-margin) 0;
	}

	.content-wrapper {
		flex-grow: 1;
		max-width: 150rem;
		margin: 0 auto 10rem;
		padding: 0 var(--2x-padding);
	}

	.section-inner {
		margin-top: var(--2x-margin);
	}

	.video-wrapper {
		margin: var(--2x-margin);
		width: calc(100% - 4rem);
		height: auto;
	}

	@media (max-width: 1280px) {
		.page-year :global(.logo-big) {
			display: none;
		}

		.header-text-wrapper {
			margin-left: 0;
		}

		.discription-text-wrapper {
			margin-right: 0;
		}

		.video-wrapper {
			margin: var(--full-margin);
			width: calc(100% - 2rem);
		}
	}

	@media (max-width: 600px) {
		.video-wrapper {
			margin: 0;
			width: 100%;
		}
	}
</style>
