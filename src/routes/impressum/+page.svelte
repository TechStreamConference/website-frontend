<script lang="ts">
	import type { LoadImpressum } from 'types/types';
	export let data: LoadImpressum; // data from database;

	import Header from 'elements/header.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import Footer from 'elements/footer.svelte';

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

<div class="content-wrapper">
	<HeadlinePage>Impressum</HeadlinePage>
</div>

<Footer menu={data.loggedIn ? footerMenuLoggedIn : footerMenu} currentYear={data.currentYear} />

<style>
	.content-wrapper {
		min-height: 100vh;
	}
</style>
