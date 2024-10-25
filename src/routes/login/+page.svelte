<script lang="ts">
	import type { LoadLogin } from 'types/loadTypes';
	export let data: LoadLogin; // data from database
	import * as Menu from 'menu/login';

	import { goto } from '$app/navigation';
	import { apiUrl } from 'helper/links';

	import Header from 'elements/navigation/header.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import ErrorMessage from 'elements/text/message.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';
	import Link from 'elements/text/link.svelte';

	import { loginLookup } from 'lookup/loginLookup';

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
			goto('/dashboard');
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

<Header menu={Menu.headerOut} />

<div class="page page-login">
	<div class="content">
		<form class="width-wrapper" on:submit|preventDefault={loginAsync}>
			<HeadlinePage>Anmelden</HeadlinePage>
			<div class="message-wrapper">
				<ErrorMessage message={loggedInMessage} />
				<ErrorMessage message={displayLoginMessage} />
				<ErrorMessage message={errorMessage} />
			</div>
			<Input
				classes="username-mail"
				id="login-username-or-email"
				type="text"
				labelText="Nutzername oder E-Mail:"
				placeholderText="Nutzername oder E-Mail"
				ariaLabel="Gib den Nutzernamen oder die E-Mail ein"
				bind:value={usernameOrEmail}
			/>
			<Input
				classes="password"
				id="login-password"
				type="password"
				labelText="Passwort:"
				placeholderText="Passwort"
				ariaLabel="Gib das Passwort ein"
				bind:value={password}
			/>
			<Link href="/register" title="Klicke, um einen neuen Account anzulegen">
				Noch keinen Account?
			</Link>
			<Button classes="text button" type="submit" ariaLabel="Klicke zum Anmelden">Anmelden</Button>
		</form>
	</div>

	<Footer globals={data.globals} menu={Menu.footerOut} />
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

	.message-wrapper {
		display: flex;
		flex-direction: column;
		margin: 3rem auto 2rem;
	}

	.page-login :global(.username-mail) {
		margin-bottom: 1rem;
	}

	.page-login :global(.password) {
		margin-bottom: 1.5rem;
	}

	.page-login :global(.button) {
		margin: 3rem auto 5rem;
	}

	@media (max-width: 1280px) {
		.width-wrapper {
			max-width: 30rem;
		}
	}
</style>
