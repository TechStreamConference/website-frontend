<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import SpeakerArray from 'elements/speaker/speakerGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import type { Speaker } from 'types/provideTypes';
	import SpeakerPopup from 'elements/speaker/speakerPopup.svelte';

	export let data: LoadYear;

	type MenuItem = [string, string];
	const headerMenu: MenuItem[] = [
		['Start', '#top'],
		['Vortragende', '#Speaker'],
		['Partner', '#Sponsors'],
		['Team', '#Team'],
		['Ablaufplan', '#Shedule'],
		['Anmelden', '/login']
	];
	const headerMenuLoggedIn: MenuItem[] = [
		['Start', '#top'],
		['Vortragende', '#Speaker'],
		['Partner', '#Sponsors'],
		['Team', '#Team'],
		['Ablaufplan', '#Shedule'],
		['Intern', '/backend'],
		['Abmelden', '/logout']
	];
	const footerMenu: MenuItem[] = [
		['Anmelden', '/login'],
		['Registrieren', '/register'],
		['Impressum', '/impressum']
	];
	const footerMenuLoggedIn: MenuItem[] = [
		['Intern', '/backend'],
		['Abmelden', '/logout'],
		['Impressum', '/impressum']
	];

	let speakerPopup: Speaker | undefined = undefined;
	function openSpeakerPopup(event: Event, speaker: Speaker) {
		speakerPopup = speaker;
	}

	function closeSpeakerPopup() {
		speakerPopup = undefined;
	}
</script>

<Header menu={data.loggedIn ? headerMenuLoggedIn : headerMenu} />
<div class="page">
	<div class="content-wrapper">
		<HeadlinePage>This is Year {data.displayedYear}</HeadlinePage>

		<Spacer --height="10rem" />
		<div id="Speaker" class="scroll-anker" />
		<HeadlineH2>Vortragende</HeadlineH2>
		<HorizontalLine />
		<Spacer --height="3rem" />
		<div class="speaker-wrapper">
			<SpeakerArray speakerData={data.year.speakers} speakerPopupCallback={openSpeakerPopup} />
		</div>

		<Spacer --height="10rem" />
		<div id="Sponsors" class="scroll-anker" />
		<HeadlineH2>Sponsoren</HeadlineH2>
		<HorizontalLine />
		<Spacer --height="3rem" />

		<Spacer --height="10rem" />
		<div id="Team" class="scroll-anker" />
		<HeadlineH2>Team</HeadlineH2>
		<HorizontalLine />
		<Spacer --height="3rem" />
		<div class="speaker-wrapper">
			<SpeakerArray speakerData={[]} speakerPopupCallback={openSpeakerPopup} />
			<!--TODO: Add Team Data-->
		</div>

		<Spacer --height="10rem" />
		<div id="Shedule" class="scroll-anker" />
		<HeadlineH2>Plan</HeadlineH2>
		<HorizontalLine />
		<Spacer --height="3rem" />

		<Spacer --height="10rem" />
	</div>
	<Footer currentYear={data.currentYear} menu={data.loggedIn ? footerMenuLoggedIn : footerMenu} />
</div>

{#if speakerPopup}
	<SpeakerPopup data={speakerPopup} on:click={closeSpeakerPopup} />
{/if}

<style>
	.scroll-anker {
		scroll-margin-top: 7rem;
	}

	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content-wrapper {
		flex-grow: 1;
		max-width: 100rem;
		margin: 0 auto;
		padding: 0 3rem;
	}
</style>
