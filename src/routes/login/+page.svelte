<script lang="ts">
	import type { LoadLogin } from 'types/loadTypes';
	export let data: LoadLogin; // data from database

	import { goto } from '$app/navigation';
	import { udpateLoginStatusAsync } from 'helper/loggedIn';
	import { apiUrl } from 'helper/links';

	import Header from 'elements/navigation/header.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import ErrorMessage from 'elements/message/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';
	import Link from 'elements/text/link.svelte';

	import { loginLookup } from 'lookup/loginLookup';

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
	const displayLoginMessage = data.showLoginMessage ? 'Du musst dich zunächst anmelden.' : '';
	let errorMessage: string = '';

	async function loginAsync(): Promise<void> {
		const data = {
			username_or_email: usernameOrEmail.trim(),
			password: password.trim()
		};

		const response: Response = await fetch(apiUrl('/api/account/login'), {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (response.ok) {
			await udpateLoginStatusAsync(fetch);
			goto('/backend');
			return;
		}

		const entriesAsync = async (response: Response): Promise<string> => {
			const text: string = await response.text();
			const json: { [key: string]: string } = JSON.parse(text);
			return loginLookup(Object.values(json)[0]);
		};
		errorMessage = await entriesAsync(response);
	}
</script>

<Header menu={headerMenu} />

<div class="page">
	<div class="content">
		<form class="width-wrapper" on:submit|preventDefault={loginAsync}>
			<HeadlinePage>Anmelden</HeadlinePage>
			<Spacer --height="3rem" />
			<ErrorMessage message={loggedInMessage} />
			<ErrorMessage message={displayLoginMessage} />
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
			<Spacer --height="1.5rem" />
			<Link href="/register">Noch keinen Account?</Link>
			<Spacer --height="3rem" />
			<div class="button-wrapper">
				<Button type="submit">Anmelden</Button>
			</div>
			<Spacer --height="5rem" />
		</form>
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
		margin: 0 3rem;
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
