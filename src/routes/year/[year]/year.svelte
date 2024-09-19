<script lang="ts">
	import Header from 'elements/navigation/header.svelte';
	import Footer from 'elements/navigation/footer.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';

	export let displayedYear: number;
	export let currentYear: number;
	export let loggedIn: boolean;

	type MenuItem = [string, string];
	const headerMenu: MenuItem[] = [
		['Start', '#top'],
		['Vortragende', '#Speaker'],
		['Partner', '#Sponsors'],
		['Ablaufplan', '#Shedule'],
		['Anmelden', '/login']
	];
	const headerMenuLoggedIn: MenuItem[] = [
		['Start', '#top'],
		['Vortragende', '#Speaker'],
		['Partner', '#Sponsors'],
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
		<SpacerHeader />

		<h1>This is Year {displayedYear}</h1>
		<h1 id="Speaker">Vortragende</h1>
		<h1 id="Sponsors">Sponsoren</h1>
		<h1 id="Shedule">Plan</h1>
	</div>
	<Footer {currentYear} menu={loggedIn ? footerMenuLoggedIn : footerMenu} />
</div>

<style>
	h1 {
		scroll-margin-top: 7rem;
	}

	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content-wrapper {
		flex-grow: 1;
	}
</style>
