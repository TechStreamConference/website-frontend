<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	import type { SponsorLinks } from 'types/provideTypes';
	export let data: LoadYear;
	import * as Menu from 'menu/year';
	import * as Format from 'helper/dates';

	import LogoBig from 'elements/image/logoBig.svelte';
	import { formatDate } from 'helper/dates';

	import YearEventLinks from 'elements/input/yearEventLinks.svelte';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import PersonArray from 'elements/person/personGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonPopup from 'elements/person/personPopup.svelte';
	import Section from 'elements/section/section.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import YouTubeVideo from 'elements/image/youTubeVideo.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SponsorArray from 'elements/sponsor/sponsorArray.svelte';

	let personPopup: Person | undefined = undefined;
	function openPersonPopup(event: Event, person: Person) {
		personPopup = person;
	}

	function closePersonPopup() {
		personPopup = undefined;
	}

	const sponsors: SponsorLinks = [
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/jetbrains_logo.fa17e4bd.png',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright:
				'Copyright © 2000-2024 JetBrains s.r.o. JetBrains and the JetBrains logo are registered trademarks of JetBrains s.r.o.'
		},
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/holy.e52d21da.gif',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright: ''
		},
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/nobreakpoint.b6bfb972.png',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright: ''
		}
	];

	const partners: SponsorLinks = [
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/indie_logo.f1cfcca1.png',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright: ''
		},
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/indihub.086d1de0.png',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright: ''
		},
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/Manasoup_Network.6fd25249.png',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright:
				'Copyright © 2000-2024 JetBrains s.r.o. JetBrains and the JetBrains logo are registered trademarks of JetBrains s.r.o.'
		},
		{
			url: 'https://www.google.de',
			image_url: 'https://test-conf.de/assets/devcom.bd710ec0.png',
			name: 'background',
			description: 'background-logo der Test-Conf. ',
			copyright: ''
		}
	];
</script>

<Header menu={data.loggedIn ? Menu.headerIn : Menu.headerOut} />
<div class="page page-year">
	<div class="header">
		<div class="header-content">
			<LogoBig classes="logo-big" />

			<div class="header-text-wrapper">
				<Headline classes="green left">{data.year.event.title}</Headline>
				<SubHeadline classes="subheadline white">
					Online-Konferenz {formatDate(data.year.event.start_date, Format.dateShort)}
					- {formatDate(data.year.event.end_date, Format.dateFull)}
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
					<Paragraph classes="discription-paragraph">{data.year.event.description}</Paragraph>
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
				<SponsorArray logos={sponsors} />
			</div>
		</Section>

		<Section>
			<HeadlineH2 classes="border">Medienpartner</HeadlineH2>
			<div class="section-inner">
				<SponsorArray logos={partners} />
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
		</Section>
	</div>
	<Footer currentYear={data.currentYear} menu={data.loggedIn ? Menu.footerIn : Menu.footerOut} />
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
		margin: 11rem 3rem;
		display: flex;
	}

	.page-year :global(.logo-big) {
		height: 18rem;
	}

	.header-text-wrapper {
		margin-left: 3rem;
	}

	.page-year :global(.subheadline) {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--secondary-color);
	}

	.page-year :global(.subtitle) {
		margin: 2rem 0 1rem;
	}

	.discription-wrapper {
		display: flex;
		flex-direction: row;
		margin-top: 2rem;
	}

	.discription-text-wrapper {
		display: flex;
		flex-direction: column;
		margin-right: 3rem;
	}

	.page-year :global(.discription-paragraph) {
		margin: 2rem 0;
	}

	.content-wrapper {
		flex-grow: 1;
		max-width: 100rem;
		margin: 0 auto 10rem;
		padding: 0 3rem;
	}

	.section-inner {
		margin-top: 3rem;
	}

	.video-wrapper {
		margin: 2rem;
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
			margin: 1rem;
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
