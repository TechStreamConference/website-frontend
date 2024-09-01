<script>
	import Header from 'elements/header.svelte';
	import Footer from 'elements/footer.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import Button from 'elements/input/button.svelte';
	import Input from 'elements/input/input.svelte';
	import ErrorMessage from 'elements/error/errorMessage.svelte';
	import MessageWrapper from 'elements/error/messageWrapper.svelte';
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';

	let currentYear = 2025; // get current year from database

	const inputLineWidth = 30;
	const inputLineSpacer = 1;

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
	<SpacerHeader />

	<div class="content">
		{#if displayRegister}
			<div class="content-wrapper">
				<Headline>Registrieren</Headline>
				<HorizontalLine --width="30rem" />
				<Spacer --height="5rem" />
				<MessageWrapper>
					<ErrorMessage bind:message={usernameMessage} />
				</MessageWrapper>
				<div class="input-line-wrapper">
					<Input
						id="register-username"
						type="text"
						labelText="Nutzername:"
						placeholderText="Nutzername"
						--width="{inputLineWidth}rem"
						on:input={usernameChance}
						bind:textValue={username}
					/>
					<Spacer --height="{inputLineSpacer}rem" />
					<Input
						id="register-email"
						type="text"
						labelText="E-Mail:"
						placeholderText="E-Mail"
						--width="{inputLineWidth}rem"
					/>
					<Spacer --height="{inputLineSpacer}rem" />
					<Input
						id="register-password"
						type="password"
						labelText="Passwort:"
						placeholderText="Passwort"
						--width="{inputLineWidth}rem"
					/>
					<Spacer --height="{inputLineSpacer}rem" />
					<Input
						id="register-password-repeat"
						type="password"
						labelText="Passwort:"
						placeholderText="Passwort Wiederholung"
						--width="{inputLineWidth}rem"
					/>
				</div>
				<Spacer --height="3rem" />
				<Button on:click={register}>Registrieren</Button>
			</div>
		{:else}
			<div class="content-wrapper">
				<Headline>Anmelden</Headline>
				<HorizontalLine --width="30rem" />
				<Spacer --height="5rem" />
				<MessageWrapper>
					<ErrorMessage bind:message={usernameMessage} />
				</MessageWrapper>
				<div class="input-line-wrapper">
					<Input
						id="login-username"
						type="text"
						labelText="Nutzername:"
						placeholderText="Nutzername"
						--width="{inputLineWidth}rem"
						on:input={usernameChance}
						bind:textValue={username}
					/>
					<Spacer --height="{inputLineSpacer}rem" />
					<Input
						id="login-email"
						type="text"
						labelText="E-Mail:"
						placeholderText="E-Mail"
						--width="{inputLineWidth}rem"
					/>
					<Spacer --height="{inputLineSpacer}rem" />
					<Input
						id="login-password"
						type="password"
						labelText="Passwort:"
						placeholderText="Passwort"
						--width="{inputLineWidth}rem"
					/>
				</div>
				<Spacer --height="3rem" />
				<Button on:click={login}>Einloggen</Button>
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
		flex-direction: column;
		margin: 3rem;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
