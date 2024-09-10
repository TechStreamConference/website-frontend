<script lang="ts">
	import { goto } from '$app/navigation';

	import Headline from 'elements/text/headline.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper">
	<Headline>Impressum</Headline>
	<Spacer --height="3rem" />
	<TextLine --text-align="center">TODO: Hier kommt das Beste Impressum hin.</TextLine>
	<Spacer --height="5rem" />
	<Button
		on:click={() => {
			goto('/');
		}}>Start</Button
	>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		min-height: 100vh;
	}
</style>
