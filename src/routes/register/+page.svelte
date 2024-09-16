<script lang="ts">
	import type { LoadRegister } from 'types/types';
	export let data: LoadRegister; // data from database

	import Header from 'elements/navigation/header.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import MessageWrapper from 'elements/message/messageWrapper.svelte';
	import ErrorMessage from 'elements/message/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import Button from 'elements/input/button.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';

	import { RegisterLookup } from 'lookup/registerLookup';

	type MenuItem = [string, string];
	const headerMenu: MenuItem[] = [
		['Start', '/'],
		['Anmelden', '/login']
	];
	const footerMenu: MenuItem[] = [
		['Anmelden', '/login'],
		['Impressum', '/impressum']
	];

	let timerUsername: number | null = null;
	let timerEmail: number | null = null;
	let timerPassword: number | null = null;

	let timerUsernameRef = { current: timerUsername };
	let timerEmailRef = { current: timerEmail };
	let timerPasswordRef = { current: timerPassword };

	let username: string = '';
	let email: string = '';
	let password_1: string = '';
	let password_2: string = '';

	const loggedInMessage = data.loggedIn ? 'Du bist bereits angemeldet' : '';
	let usernameMessage: string = '';
	let emailMessage: string = '';
	let passwordMessage: string = '';
	let errorMessage: string[] = [''];

	let registered: boolean = false;

	function startTimer(timer: { current: number | null }, callback: Function, time: number): void {
		if (timer.current !== null) {
			clearTimeout(timer.current);
			timer.current = null;
		}
		timer.current = setTimeout(() => {
			callback();
		}, time);
	}

	function startPasswordTimer() {
		const isSecondShorter = password_1.trim().length > password_2.trim().length;
		if (isSecondShorter) {
			startTimer(timerPasswordRef, onPasswordChanged, 500);
			return;
		}

		if (timerPassword) {
			clearTimeout(timerPassword);
			timerPassword = null;
		}

		onPasswordChanged();
	}

	function samePassword(): boolean {
		return password_1.trim() === password_2.trim();
	}

	async function onUsernameChangedAsync(): Promise<void> {
		const reset: Function = (): void => {
			usernameMessage = '';
		};

		if (username.trim() === '') {
			reset();
			return;
		}

		const response: Response = await fetch(
			'api/account/username/exists?username=' + username.trim()
		);
		if (!response.ok) {
			console.error('Fehler beim überprüfen des Namen. Fehlercode: ' + response.status);
			return;
		}

		let data: { exists: boolean };
		try {
			data = await response.json();
		} catch (error) {
			console.error('error while parsing username json', error);
			reset();
			return;
		}

		if (data.exists) {
			usernameMessage = 'Der Name  "' + username.trim() + '" ist bereits vergeben.';
			return;
		}

		reset();
	}

	async function onEmailChangedAsync(): Promise<void> {
		const reset: Function = (): void => {
			emailMessage = '';
		};

		if (email.trim() === '') {
			reset();
			return;
		}

		const response: Response = await fetch('api/account/email/exists?email=' + email.trim());
		if (!response.ok) {
			console.error('Fehler beim überprüfen der E-Mail. Fehlercode: ' + response.status);
			return;
		}

		let data: { exists: boolean };
		try {
			data = await response.json();
		} catch (error) {
			console.error('error while parsing email json', error);
			reset();
			return;
		}

		if (data.exists) {
			emailMessage = 'Die E-Mail "' + email.trim() + '" wird bereits verwendet.';
			return;
		}

		reset();
	}

	function onPasswordChanged(): void {
		const reset: Function = (): void => {
			passwordMessage = '';
		};

		if (password_1.trim() === '') {
			reset();
			return;
		}

		if (password_2.trim() === '') {
			reset();
			return;
		}

		if (!samePassword()) {
			passwordMessage = 'Die Passwörter stimmen nicht überein.';
			return;
		}

		reset();
	}

	async function registerAsync(): Promise<void> {
		if (!samePassword()) {
			return;
		}

		const reset: Function = () => {
			errorMessage = [''];
		};

		const data: { username: string; email: string; password: string } = {
			username: username.trim(),
			email: email.trim(),
			password: password_1.trim()
		};
		const response: Response = await fetch('api/account/register', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const entriesAsync = async (response: Response): Promise<string[]> => {
				const text: string = await response.text();
				const json: { [key: string]: string } = JSON.parse(text);
				console.log(json);
				const values: string[] = Object.values(json);
				console.log(values);
				let toReturn: string[] = [];
				for (const value of values) {
					toReturn.push(RegisterLookup(value));
				}
				return toReturn;
			};
			errorMessage = await entriesAsync(response);
			return;
		}
		reset();
		registered = true;
	}
</script>

<Header menu={headerMenu} />

<div class="page">
	<div class="content">
		{#if !registered}
			<form class="width-wrapper" on:submit|preventDefault={registerAsync}>
				<HeadlinePage>Registrieren</HeadlinePage>
				<Spacer --height="3rem" />
				<MessageWrapper>
					<ErrorMessage message={loggedInMessage} />
					<ErrorMessage message={usernameMessage} />
					<ErrorMessage message={emailMessage} />
					<ErrorMessage message={passwordMessage} />
					{#each errorMessage as message}
						<ErrorMessage {message} />
					{/each}
				</MessageWrapper>
				<Spacer --height="2rem" />
				<Input
					id="register-username"
					type="text"
					labelText="Name:"
					placeholderText="Name"
					bind:value={username}
					on:input={() => {
						startTimer(timerUsernameRef, onUsernameChangedAsync, 200);
					}}
				/>
				<Spacer --height="1rem" />
				<Input
					id="register-email"
					type="text"
					labelText="E-Mail:"
					placeholderText="E-Mail"
					bind:value={email}
					on:input={() => {
						startTimer(timerEmailRef, onEmailChangedAsync, 200);
					}}
				/>
				<Spacer --height="1rem" />
				<Input
					id="register-password"
					type="password"
					labelText="Passwort:"
					placeholderText="Passwort"
					bind:value={password_1}
					on:input={startPasswordTimer}
				/>
				<Spacer --height="1rem" />
				<Input
					id="register-password-repeat"
					type="password"
					labelText="Passwort wiederholen:"
					placeholderText="Passwort wiederholen"
					bind:value={password_2}
					on:input={startPasswordTimer}
				/>
				<Spacer --height="3rem" />
				<Button type={'submit'}>Registrieren</Button>
				<div class="password-list-wrapper">
					<Spacer --height="3rem" />
					<TextLine>Dein Passwort sollte folgendes enthalten:</TextLine>
					<Spacer --height="0.5rem" />
					<List classes="padding-left">
						<ListElement classes="dot">mind. 8 Zeichen</ListElement>
						<ListElement classes="dot">mind. 1 Kleinbuchstaben</ListElement>
						<ListElement classes="dot">mind. 1 Großbuchstaben</ListElement>
						<ListElement classes="dot">mind. 1 Zahl</ListElement>
						<ListElement classes="dot">mind. 1 Sonderzeichen</ListElement>
					</List>
				</div>
			</form>
			<Spacer --height="5rem" />
		{:else}
			<div class="width-wrapper-registered">
				<HeadlinePage>Registriert</HeadlinePage>
				<Spacer --height="7rem" />
				<TextLine --text-align="center">Deine Registrierung war erfolgreich.</TextLine>
				<Spacer --height="2rem" />
				<Paragraph --text-align="center">
					Du bekommst jetzt eine Mail. Bestätige deine Mailadresse, um dich anmelden zu können.
					Weitere Infos findest du nach dem Anmelden.
				</Paragraph>
				<Spacer --height="6rem" />
				<div class="button-wrapper">
					<a href="/">
						<Button>Start</Button>
					</a>
					<a href="./login">
						<Button>Anmelden</Button>
					</a>
				</div>
			</div>
			<Spacer --height="5rem" />
		{/if}
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

	a {
		align-self: center;
	}

	.width-wrapper {
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.width-wrapper-registered {
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.password-list-wrapper {
		margin: 0 auto;
	}

	.button-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin: 0;
	}

	@media (max-width: 1280px) {
		.width-wrapper {
			max-width: 30rem;
		}
		.width-wrapper-registered {
			max-width: 32rem;
		}

		.password-list-wrapper {
			margin: 0;
		}
	}
</style>
