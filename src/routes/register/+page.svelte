<script>
	export let data; // data from database

	import Header from 'elements/header.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import Footer from 'elements/footer.svelte';

	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import MessageWrapper from 'elements/messages/messageWrapper.svelte';
	import ErrorMessage from 'elements/messages/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';
	import Button from 'elements/input/button.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';

	const headerMenu = [
		['Start', '/'],
		['Anmelden', '/login']
	];
	const footerMenu = [
		['Anmelden', '/login'],
		['Impressum', '/impressum']
	];

	let timerUsername = null;
	let timerEmail = null;

	let username = '';
	let email = '';
	let password_1 = '';
	let password_2 = '';

	let usernameMessage = '';
	let emailMessage = '';
	let passwordMessage = '';
	let errorMessage = [''];

	let registered = false;

	function startTimerUsername() {
		if (timerUsername !== null) {
			clearTimeout(timerUsername);
			timerUsername = null;
		}
		timerUsername = setTimeout(() => {
			onUsernameChanged();
		}, 1000);
	}

	function startTimerEmail() {
		if (timerEmail !== null) {
			clearTimeout(timerEmail);
			timerEmail = null;
		}
		timerEmail = setTimeout(() => {
			onEmailChanged();
		}, 1000);
	}

	function samePassword() {
		return password_1.trim() === password_2.trim();
	}

	async function onUsernameChanged() {
		const reset = () => {
			usernameMessage = '';
		};

		if (username.trim() === '') {
			reset();
			return;
		}

		const response = await fetch('api/account/username/exists?username=' + username);
		if (!response.ok) {
			usernameMessage = 'Fehler beim überprüfen des Namen. Fehlercode: ' + response.status;
			return;
		}

		let data;
		try {
			data = await response.json();
		} catch (error) {
			console.error('error while parsing username json', error);
			reset();
			return;
		}

		if (data.exists) {
			usernameMessage = 'Der Name  "' + username + '" ist bereits vergeben.';
			return;
		}

		reset();
	}

	async function onEmailChanged() {
		const reset = () => {
			emailMessage = '';
		};

		if (email.trim() === '') {
			reset();
			return;
		}

		const response = await fetch('api/account/email/exists?email=' + email);
		if (!response.ok) {
			emailMessage = 'Fehler beim überprüfen der E-Mail. Fehlercode: ' + response.status;
			return;
		}

		let data;
		try {
			data = await response.json();
		} catch (error) {
			console.error('error while parsing email json', error);
			reset();
			return;
		}

		if (data.exists) {
			emailMessage = 'Die E-Mail "' + email + '" wird bereits verwendet.';
			return;
		}

		reset();
	}

	function onPasswordChanged() {
		const reset = () => {
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

	async function register() {
		if (!samePassword()) {
			return;
		}

		const reset = () => {
			errorMessage = [''];
		};

		const data = {
			username: username.trim(),
			email: email.trim(),
			password: password_1.trim()
		};
		const response = await fetch('api/account/register', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const entries = async (r) => {
				const t = await r.text();
				const j = JSON.parse(t);
				return Object.values(j);
			};
			errorMessage = await entries(response);
			return;
		}
		reset();
		registered = true;
	}
</script>

<Header menu={headerMenu} />

<div class="page">
	<SpacerHeader />

	<div class="content">
		{#if !registered}
			<Headline>Registrieren</Headline>
			<form on:submit|preventDefault={register}>
				<div class="width-wrapper">
					<HorizontalLine />
					<Spacer --height="3rem" />
					<MessageWrapper>
						<ErrorMessage bind:message={usernameMessage} />
						<ErrorMessage bind:message={emailMessage} />
						<ErrorMessage bind:message={passwordMessage} />
						{#each errorMessage as message}
							<ErrorMessage bind:message />
						{/each}
					</MessageWrapper>
					<Spacer --height="2rem" />
					<Input
						id="register-username"
						type="text"
						labelText="Name:"
						placeholderText="Name"
						bind:textValue={username}
						on:input={startTimerUsername}
					/>
					<Spacer --height="1rem" />
					<Input
						id="register-email"
						type="text"
						labelText="E-Mail:"
						placeholderText="E-Mail"
						bind:textValue={email}
						on:input={startTimerEmail}
					/>
					<Spacer --height="1rem" />
					<Input
						id="register-password"
						type="password"
						labelText="Passwort:"
						placeholderText="Passwort"
						bind:textValue={password_1}
						on:input={onPasswordChanged}
					/>
					<Spacer --height="1rem" />
					<Input
						id="register-password-repeat"
						type="password"
						labelText="Passwort wiederholen:"
						placeholderText="Passwort wiederholen"
						bind:textValue={password_2}
						on:input={onPasswordChanged}
					/>

					<div class="password-list-wrapper">
						<Spacer --height="3rem" />
						<TextLine>Dein Password sollte folgendes enthalten:</TextLine>
						<Spacer --height="0.5rem" />
						<List classes="padding-left">
							<ListElement classes="dot">min. 8 Zeichen</ListElement>
							<ListElement classes="dot">min. 1 Kleinbuchstaben</ListElement>
							<ListElement classes="dot">min. 1 Großbuchstaben</ListElement>
							<ListElement classes="dot">min. 1 Zahl</ListElement>
							<ListElement classes="dot">min. 1 Sonderzeichen</ListElement>
						</List>
					</div>
					<Spacer --height="5rem" />
					<Button type={'submit'}>Registrieren</Button>
				</div>
			</form>
			<Spacer --height="3rem" />
		{:else}
			<Headline>Registriert</Headline>
			<div class="width-wrapper-registered">
				<HorizontalLine />
				<Spacer --height="7rem" />
				<TextLine --text-align="center">Deine Registrierung war erfolgreich.</TextLine>
				<Spacer --height="2rem" />
				<Paragraph --text-align="center">
					Du bekommst jetzt eine Mail. Bestätige deine Mailadresse und du kannst dich anmelden.
					Weitere Infos findest du nach dem anmelden.
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
			<Spacer --height="3rem" />
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
		margin: 3rem;
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
