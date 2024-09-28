<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	export let data: LoadYear;
	import * as Menu from 'menu/year';

	import LogoBig from 'elements/image/logoBig.svelte';

	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import PersonArray from 'elements/person/personGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import Headline from 'elements/text/headline.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonPopup from 'elements/person/personPopup.svelte';
	import Section from 'elements/section/section.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Link from 'elements/text/link.svelte';
	import Icon from 'elements/image/icon.svelte';
	import YoutubeVideo from 'elements/image/youtubeVideo.svelte';

	let personPopup: Person | undefined = undefined;
	function openPersonPopup(event: Event, person: Person) {
		personPopup = person;
	}

	function closePersonPopup() {
		personPopup = undefined;
	}
</script>

<Header menu={data.loggedIn ? Menu.headerIn : Menu.headerOut} />
<div class="page">
	<div class="header">
		<div class="header-content">
			<LogoBig classes="year-header-logo-big" />

			<div class="header-text-wrapper">
				<Headline classes="green left">{data.year.event.title}</Headline>
				<SubHeadline classes="year-header-subheadline white">
					Online-Konferenz {data.year.event.start_date} - {data.year.event.end_date}
				</SubHeadline>
				<SubHeadline classes="year-header-subtitle white">{data.year.event.subtitle}</SubHeadline>
				<div class="header-link-wrapper">
					<Link
						href={data.year.event.discord_url}
						classes="animated white"
						title="Klicker hier um auf den Discord Server der Test-Conf zu gelangen"
					>
						<div class="header-link-entry-wrapper"><Icon type="Discord" />Sei dabei</div>
					</Link>
					<Link
						href={data.year.event.twitch_url}
						classes="animated white"
						title="Klicke hier um auf die Twitch Seite der Test-Conf zu gelangen"
					>
						<div class="header-link-entry-wrapper"><Icon type="Twitch" />Schau zu</div>
					</Link>
					<Link
						href={data.year.event.presskit_url}
						classes="animated white"
						title="Klicke hier um das Presskit der Test-Conf herunter zu laden"
					>
						<div class="header-link-entry-wrapper"><Icon type="Download" />Presskit</div>
					</Link>
				</div>
			</div>
		</div>
	</div>
	<div class="content-wrapper">
		<Section id="Trailer">
			<div class="video-wrapper">
				<YoutubeVideo />
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
		</Section>

		<Section id="Team">
			<HeadlineH2 classes="border">Team</HeadlineH2>
			<div class="person-wrapper">
				<PersonArray personData={[]} personPopupCallback={openPersonPopup} />
				<!--TODO: Add Team Data-->
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

	:global(.year-header-logo-big) {
		height: 18rem;
	}

	.header-text-wrapper {
		margin-left: 3rem;
	}

	:global(.year-header-subheadline) {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--green-color);
	}

	:global(.year-header-subtitle) {
		margin: 2rem 0 1rem;
	}

	.header-link-wrapper {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.header-link-entry-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--primary-color);
		padding: 0.1rem 0.5rem 0.1rem 0.3rem;
		border-radius: var(--border-radius);
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
	}

	@media (max-width: 1280px) {
		:global(.year-header-logo-big) {
			display: none;
		}

		.header-text-wrapper {
			margin-left: 0;
		}
	}
</style>
