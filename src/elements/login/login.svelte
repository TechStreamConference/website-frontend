<script>
	import Headline from 'elements/text/headline.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import MessageWrapper from 'elements/error/messageWrapper.svelte';
	import ErrorMessage from 'elements/error/errorMessage.svelte';
	import Input from 'elements/input/input.svelte';
	import Button from 'elements/input/button.svelte';

	export let inputLineWidth;
	export let inputLineSpacer;

	let errorMessage = '';

	function login() {
		console.log('TODO: Login');
	}
</script>

<Headline>Anmelden</Headline>
<HorizontalLine --width="30rem" />
<Spacer --height="5rem" />
<MessageWrapper>
	<ErrorMessage bind:message={errorMessage} />
</MessageWrapper>
<div class="input-line-wrapper">
	<Input
		id="login-username-or-email"
		type="text"
		labelText="Nutzername oder E-Mail:"
		placeholderText="Nutzername oder E-Mail"
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
<Spacer --height="5rem" />
<Button on:click={login}>Einloggen</Button>
