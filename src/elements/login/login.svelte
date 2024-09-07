<script>
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import MessageWrapper from 'elements/messanges/messageWrapper.svelte';
	import ErrorMessage from 'elements/messanges/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';

	let errorMessage = '';

	function login() {
		console.log('TODO: Login');
	}
</script>

<Headline>Anmelden</Headline>
<div class="width-wrapper">
	<HorizontalLine />
	<Spacer --height="3rem" />
	<MessageWrapper>
		<ErrorMessage bind:message={errorMessage} />
	</MessageWrapper>
	<Spacer --height="2rem" />
	<div class="input-line-wrapper">
		<Input
			id="login-username-or-email"
			type="text"
			labelText="Nutzername oder E-Mail:"
			placeholderText="Nutzername oder E-Mail"
		/>
		<Spacer --height="1rem" />
		<Input id="login-password" type="password" labelText="Passwort:" placeholderText="Passwort" />
	</div>
	<Spacer --height="5rem" />
	<Button on:click={login}>Einloggen</Button>
	<Spacer --height="3rem" />
</div>

<style>
	.width-wrapper {
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 1280px) {
		.width-wrapper {
			max-width: 30rem;
		}
	}
</style>
