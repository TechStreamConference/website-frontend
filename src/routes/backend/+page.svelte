<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper">
	<Headline>Backend</Headline>
	<Spacer --height="3rem" />
	<TextLine --text-align="center">TODO: Hier kommt das Beste Backend hin.</TextLine>
	<Spacer --height="5rem" />
	<Button
		on:click={() => {
			window.location.href = '/';
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
