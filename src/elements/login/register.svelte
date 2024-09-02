<script>
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import MessageWrapper from 'elements/error/messageWrapper.svelte';
	import ErrorMessage from 'elements/error/errorMessage.svelte';
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
	let errorMessage = '';

	function register() {
		console.log('TODO Register');
	}

	async function usernameChanged() {
		const reset = () => {
			usernameMessage = '';
		};

		if (username.trim() === '') {
			reset();
			return;
		}

		const response = await fetch('api/account/username/exists?username=' + username);
		console.log(response);
		if (!response.ok) {
			usernameMessage = 'Fehler beim überprüfen des Nutzernamen.';
			return;
		}

		reset();
	}
</script>

<Headline>Registrieren</Headline>
<HorizontalLine --width="30rem" />
<Spacer --height="5rem" />
<MessageWrapper>
	<ErrorMessage bind:message={usernameMessage} />
	<ErrorMessage bind:message={emailMessage} />
	<ErrorMessage bind:message={passwordMessage} />
	<ErrorMessage bind:message={errorMessage} />
</MessageWrapper>
<div class="input-line-wrapper">
	<Input
		id="register-username"
		type="text"
		labelText="Nutzername:"
		placeholderText="Nutzername"
		--width="{inputLineWidth}rem"
		bind:textValue={username}
		on:input={usernameChanged}
	/>
	<Spacer --height="{inputLineSpacer}rem" />
	<Input
		id="register-email"
		type="text"
		labelText="E-Mail:"
		placeholderText="E-Mail"
		--width="{inputLineWidth}rem"
		bind:textValue={email}
	/>
	<Spacer --height="{inputLineSpacer}rem" />
	<Input
		id="register-password"
		type="password"
		labelText="Passwort:"
		placeholderText="Passwort"
		--width="{inputLineWidth}rem"
		bind:textValue={password_1}
	/>
	<Spacer --height="{inputLineSpacer}rem" />
	<Input
		id="register-password-repeat"
		type="password"
		labelText="Passwort:"
		placeholderText="Passwort Wiederholung"
		--width="{inputLineWidth}rem"
		bind:textValue={password_2}
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
