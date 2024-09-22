<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import PersonArray from 'elements/person/personGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonPopup from 'elements/person/personPopup.svelte';

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

	let personPopup: Person | undefined = undefined;
	function openPersonPopup(event: Event, person: Person) {
		personPopup = person;
	}

	function closePersonPopup() {
		personPopup = undefined;
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
		<div class="person-wrapper">
			<PersonArray personData={data.year.speakers} personPopupCallback={openPersonPopup} />
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
		<div class="person-wrapper">
			<PersonArray personData={[]} personPopupCallback={openPersonPopup} />
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

{#if personPopup}
	<PersonPopup data={personPopup} on:click={closePersonPopup} />
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
