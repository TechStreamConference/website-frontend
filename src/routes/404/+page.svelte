<script lang="ts">
	import { goto } from '$app/navigation';

	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<div class="wrapper">
	<HeadlinePage>404</HeadlinePage>
	<Spacer --height="3rem" />
	<TextLine --text-align="center">TODO: 404 Page.</TextLine>
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
