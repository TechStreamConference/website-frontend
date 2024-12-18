<script lang="ts">
	import Footer from 'elements/navigation/footer.svelte';
	import Header from 'elements/navigation/header.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import * as Menu from 'menu/verify.js';

	export let data;
</script>

<div class="verify-email-page-wrapper">
	<Header menu={Menu.header} />
	<div class="verify-email-content-wrapper">
		{#if data.success === undefined}
			<TextLine>E-Mail-Adresse wird verifiziert...</TextLine>
		{:else if data.success}
			<TextLine>E-Mail-Adresse wurde verifiziert.</TextLine>
		{:else}
			<TextLine>Token ist ungültig.</TextLine>
		{/if}
	</div>
	<Footer globals={data.globals} menu={Menu.footer} />
</div>

<style>
	.verify-email-page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.verify-email-content-wrapper {
		flex-grow: 1;
	}
</style>
