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
		<div class="content-wrapper">
			<h1 class="headline-small center-text">Login</h1>
			<button class="my-button">Login</button>
		</div>
		<div class="line"></div>
		<div class="content-wrapper">
			<h1 class="headline-small center-text">Register</h1>
			<button class="my-button">Register</button>
		</div>
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
		display: flex;
		flex-direction: row;
		min-width: 100vh;
		margin: 3rem;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.center-text {
		text-align: center;
	}

	.my-button{
		margin:0 auto;
		height: 3rem;
		width: 7rem;
	}

	.line {
		width: 3px;
		background-color: var(--lines-color);
	}
</style>
