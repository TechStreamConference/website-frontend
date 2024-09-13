<script lang="ts">
	import type { LoadImpressum } from 'types/types';
	export let data: LoadImpressum; // data from database;

	import Header from 'elements/header.svelte';
	import Footer from 'elements/footer.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';

	import Headline from 'elements/text/headline.svelte';

	type MenuItem = [string, string];
	const headerMenu: MenuItem[] = [
		['Start', '/'],
		['Anmelden', '/login'],
		['Registrieren', '/register']
	];
	const headerMenuLoggedIn: MenuItem[] = [
		['Start', '/'],
		['Abmelden', '/logout']
	];

	const footerMenu: MenuItem[] = [
		['Anmelden', '/login'],
		['Registrieren', '/register']
	];
	const footerMenuLoggedIn: MenuItem[] = [['Intern', '/backend']];
</script>

<Header menu={data.loggedIn ? headerMenuLoggedIn : headerMenu} />
<SpacerHeader />

<div class="content-wrapper">
	<Headline>Impressum</Headline>
</div>

<Footer menu={data.loggedIn ? footerMenuLoggedIn : footerMenu} currentYear={data.currentYear} />

<style>
	.content-wrapper {
		min-height: 100vh;
	}
</style>
