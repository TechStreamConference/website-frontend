<script>
	import Header from 'elements/header.svelte';
	import Footer from 'elements/footer.svelte';
	import MainPage from 'elements/mainPage.svelte';

	let currentYear = 2025; // get current year from database

	export let displayRegister = false;
	export let headerMenu = [['', '']];
	export let footerMenu = [['', '']];

	let username = '';

	let usernameMessage = '';

	function login() {
		console.log('TODO: login');
	}

	function register() {
		console.log('TODO: register');
	}

	function usernameChance() {
		usernameMessage = username;
	}
</script>

<Header menu={headerMenu} />

<div class="page">
	<MainPage />

	<div class="content">
		{#if displayRegister}
			<div class="content-wrapper">
				<h1 class="headline-small center-text">Register</h1>
				<div class=my-line-horizontal></div>
				<div class="input-line-wrapper">
					<label for="username" class="my-label">Username:</label>
					<input
						type="text"
						name="username"
						placeholder="username"
						class="my-input-line"
						on:input={usernameChance}
						bind:value={username}
					/>
					<label for="email" class="my-label">E-Mail:</label>
					<input type="text" name="email" placeholder="e-mail" class="my-input-line" />
					<label for="password" class="my-label">Password:</label>
					<input type="password" name="password" placeholder="passowrd" class="my-input-line" />
					<label for="password" class="my-label">Password:</label>
					<input
						type="password-repeated"
						name="password-repeated"
						placeholder="passowrd"
						class="my-input-line"
					/>
				</div>
				<button class="my-button" on:click={register}>Register</button>
			</div>
		{:else}
			<div class="content-wrapper">
				<h1 class="headline-small center-text">Login</h1>
				<div class=my-line-horizontal></div>
				<div class="input-line-wrapper">
					<label for="username" class="my-label">Username:</label>
					<input type="text" name="username" placeholder="username" class="my-input-line" />
					<label for="email" class="my-label">E-Mail:</label>
					<input type="text" name="email" placeholder="e-mail" class="my-input-line" />
					<label for="password" class="my-label">Password:</label>
					<input type="password" name="password" placeholder="passowrd" class="my-input-line" />
				</div>
				<button class="my-button" on:click={login}>Login</button>
			</div>
		{/if}

		<div class="message-wrapper">
			{#if usernameMessage !== ''}
				<p class="error-message">{usernameMessage}</p>
			{/if}
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
		flex-direction: column;
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
		margin: 0;
	}

	.my-line-horizontal {
		width: 30rem;
		margin-bottom:5rem;
	}

	.input-line-wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}

	.my-input-line {
		margin-bottom: 1rem;
		width: 30rem;
	}

	.my-button {
		margin: 3rem auto 0 auto;
	}

	.message-wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}

	.error-message {
		background-color: red;
		color: var(--text-color);
	}

	@media (max-width: 1280px) {
		.content {
			flex-direction: column;
		}
	}
</style>
