<script lang="ts">
	import type { LoadYear } from 'types/loadTypes';
	export let data: LoadYear;
	import * as Menu from 'menu/year';

	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import PersonArray from 'elements/person/personGrid.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonPopup from 'elements/person/personPopup.svelte';
	import Section from 'elements/section/section.svelte';

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
	<div class="content-wrapper">
		<HeadlinePage>This is Year {data.year.event.year}</HeadlinePage>

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

	.content-wrapper {
		flex-grow: 1;
		max-width: 100rem;
		margin: 0 auto 10rem;
		padding: 0 3rem;
	}

	.section-inner {
		margin-top: 3rem;
	}
</style>
