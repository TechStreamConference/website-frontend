<script>
	import Header from 'elements/header.svelte';
	import Footer from 'elements/footer.svelte';
	import MainPage from 'elements/mainPage.svelte';

	let currentYear = 2025; // get current year from database

	export let displayRegister = false;
	export let headerMenu = [['', '']];
	export let footerMenu = [['', '']];

	function login() {
		console.log('TODO: login');
	}

	function register() {
		console.log('TODO: register');
	}
</script>

<Header menu={headerMenu} />

<div class="page">
	<MainPage />

	<div class="content">
		{#if displayRegister}
			<div class="content-wrapper">
				<h1 class="headline-small center-text">Register</h1>
				<button class="my-button" on:click={register}>Register</button>
			</div>
		{:else}
			<div class="content-wrapper">
				<h1 class="headline-small center-text">Login</h1>
				<button class="my-button" on:click={login}>Login</button>
			</div>
		{/if}
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

	.headline-small {
		margin-top: 0;
	}

	.my-button {
		margin: 0 auto;
		height: 3rem;
		width: 7rem;
	}

	@media (max-width: 1280px) {
		.content {
			flex-direction: column;
		}
	}
</style>
