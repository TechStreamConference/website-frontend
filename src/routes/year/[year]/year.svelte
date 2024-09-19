<script lang="ts">
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import SpeakerArray from 'elements/speaker/speakerArray.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';

	export let displayedYear: number;
	export let currentYear: number;
	export let loggedIn: boolean;

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
</script>

<Header menu={loggedIn ? headerMenuLoggedIn : headerMenu} />
<div class="page">
	<div class="content-wrapper">
		<HeadlinePage>This is Year {displayedYear}</HeadlinePage>

		<Spacer --height="10rem" />
		<div id="Speaker" class="scroll-anker" />
		<HeadlineH2>Vortragende</HeadlineH2>
		<HorizontalLine />
		<Spacer --height="3rem" />
		<div class="speaker-wrapper">
			<SpeakerArray />
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
			<SpeakerArray />
		</div>

		<Spacer --height="10rem" />
		<div id="Shedule" class="scroll-anker" />
		<HeadlineH2>Plan</HeadlineH2>
		<HorizontalLine />
		<Spacer --height="3rem" />

		<Spacer --height="10rem" />
	</div>
	<Footer {currentYear} menu={loggedIn ? footerMenuLoggedIn : footerMenu} />
</div>

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
