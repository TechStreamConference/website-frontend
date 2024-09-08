<script>
	export let data; // data from database

	import { goto } from '$app/navigation';

	import Header from 'elements/header.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import Footer from 'elements/footer.svelte';
	
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import ErrorMessage from 'elements/messanges/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';

	const headerMenu = [['Start', '/ ']];
	const footerMenu = [
		['Registrieren', '/register'],
		['Impressum', '/impressum']
	];

	let usernameOrEmail = '';
	let password = '';

	let errorMessage = '';

	async function login() {
		const data = {
			username_or_email: usernameOrEmail.trim(),
			password: password.trim()
		};

		const response = await fetch('api/account/login', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (response.ok) {
			goto('/backend');
			return;
		}

		const entries = async (r) => {
			const t = await r.text();
			const j = JSON.parse(t);
			return Object.values(j)[0];
		};
		errorMessage = await entries(response);
	}
</script>

<Header menu={headerMenu} />

<div class="page">
	<SpacerHeader />

	<div class="content">
		<Headline>Anmelden</Headline>
		<div class="width-wrapper">
			<form on:submit|preventDefault={login}>
				<HorizontalLine />
				<Spacer --height="3rem" />
				<ErrorMessage bind:message={errorMessage} />
				<Spacer --height="2rem" />
				<Input
					id="login-username-or-email"
					type="text"
					labelText="Nutzername oder E-Mail:"
					placeholderText="Nutzername oder E-Mail"
					bind:textValue={usernameOrEmail}
				/>
				<Spacer --height="1rem" />
				<Input
					id="login-password"
					type="password"
					labelText="Passwort:"
					placeholderText="Passwort"
					bind:textValue={password}
				/>

				<Spacer --height="5rem" />
				<div class="button-wrapper">
					<Button type="submit">Einloggen</Button>
				</div>
			</form>
			<Spacer --height="3rem" />
		</div>
	</div>

	<Footer currentYear={data.curentYear} menu={footerMenu} />
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

	.width-wrapper {
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.button-wrapper {
		display: flex;
		flex-direction: row;
		margin: 0 auto;
	}

	@media (max-width: 1280px) {
		.width-wrapper {
			max-width: 30rem;
		}
	}
</style>
