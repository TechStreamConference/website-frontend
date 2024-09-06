<script>
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import MessageWrapper from 'elements/messanges/messageWrapper.svelte';
	import ErrorMessage from 'elements/messanges/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';
	import Textline from 'elements/text/textline.svelte';
	import List from 'elements/list/list.svelte';
	import ListElement from 'elements/list/listElement.svelte';

	export let inputLineWidth;
	export let inputLineSpacer;

	let username = '';
	let email = '';
	let password_1 = '';
	let password_2 = '';

	let usernameMessage = '';
	let emailMessage = '';
	let passwordMessage = '';
	let errorMessage = [''];

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
			usernameMessage = 'Fehler beim überprüfen des Nutzernamen. Fehlercode: ' + response.status;
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
			usernameMessage = 'Der Nutzername ist bereits vergeben.';
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
			emailMessage = 'Die E-Mail wird bereits verwendet.';
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
			username: username,
			email: email,
			password: password_1
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
	}
</script>

<Headline>Registrieren</Headline>
<HorizontalLine --width="30rem" />
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
<div class="input-line-wrapper">
	<Input
		id="register-username"
		type="text"
		labelText="Nutzername:"
		placeholderText="Nutzername"
		--width="{inputLineWidth}rem"
		bind:textValue={username}
		on:input={onUsernameChanged}
	/>
	<Spacer --height="{inputLineSpacer}rem" />
	<Input
		id="register-email"
		type="text"
		labelText="E-Mail:"
		placeholderText="E-Mail"
		--width="{inputLineWidth}rem"
		bind:textValue={email}
		on:input={onEmailChanged}
	/>
	<Spacer --height="{inputLineSpacer}rem" />
	<Input
		id="register-password"
		type="password"
		labelText="Passwort:"
		placeholderText="Passwort"
		--width="{inputLineWidth}rem"
		bind:textValue={password_1}
		on:input={onPasswordChanged}
	/>
	<Spacer --height="{inputLineSpacer}rem" />
	<Input
		id="register-password-repeat"
		type="password"
		labelText="Passwort:"
		placeholderText="Passwort Wiederholung"
		--width="{inputLineWidth}rem"
		bind:textValue={password_2}
		on:input={onPasswordChanged}
	/>
	<Spacer --height="3rem" />
	<Textline>Dein Password sollte folgendes enthalten:</Textline>
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
<Button on:click={register}>Registrieren</Button>
