<script lang="ts">
	import type { LoadLogin } from 'types/types';
	export let data: LoadLogin; // data from database

	import { goto } from '$app/navigation';
	import { udpateLoginStatus } from 'helper/loggedIn';

	import Header from 'elements/header.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import Footer from 'elements/footer.svelte';

	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import ErrorMessage from 'elements/messages/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';

	type MenuItem = [string, string];
	const headerMenu: MenuItem[] = [
		['Start', '/'],
		['Registrieren', '/register']
	];
	const footerMenu: MenuItem[] = [
		['Registrieren', '/register'],
		['Impressum', '/impressum']
	];

	let usernameOrEmail: string = '';
	let password: string = '';

	const loggedInMessage = data.loggedIn ? 'Du bist bereits angemeldet.' : '';
	let errorMessage: string = '';

	async function login(): Promise<void> {
		const data = {
			username_or_email: usernameOrEmail.trim(),
			password: password.trim()
		};

		const response: Response = await fetch('api/account/login', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (response.ok) {
			await udpateLoginStatus(fetch);
			goto('/backend');
			return;
		}

		const entries = async (response: Response): Promise<string> => {
			const text: string = await response.text();
			const json: { [key: string]: string } = JSON.parse(text);
			return Object.values(json)[0];
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
				<ErrorMessage message={loggedInMessage} />
				<ErrorMessage message={errorMessage} />
				<Spacer --height="2rem" />
				<Input
					id="login-username-or-email"
					type="text"
					labelText="Nutzername oder E-Mail:"
					placeholderText="Nutzername oder E-Mail"
					bind:value={usernameOrEmail}
				/>
				<Spacer --height="1rem" />
				<Input
					id="login-password"
					type="password"
					labelText="Passwort:"
					placeholderText="Passwort"
					bind:value={password}
				/>

				<Spacer --height="5rem" />
				<div class="button-wrapper">
					<Button type="submit">Anmelden</Button>
				</div>
			</form>
			<Spacer --height="3rem" />
		</div>
	</div>

	<Footer currentYear={data.currentYear} menu={footerMenu} />
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
