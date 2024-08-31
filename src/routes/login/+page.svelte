<script>
	import Header from 'elements/header.svelte';
	import Footer from 'elements/footer.svelte';
	import MainPage from 'elements/mainPage.svelte';

	let currentYear = 2025; // get current year from database

	const headerMenu = [['Home', '/ ']];
	const footerMenu = [
		['Register', '/login'],
		['Impressum', '/impressum']
	];
</script>

<Header menu={headerMenu} />

<div class="page">
	<MainPage />

	<div class="content">
        <p>content here</p>
    </div>

	<Footer {currentYear} menu={footerMenu} />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex-grow: 1;
	}
</style>
