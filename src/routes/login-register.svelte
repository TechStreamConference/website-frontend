<script>
	import Header from 'elements/header.svelte';
	import Footer from 'elements/footer.svelte';
	import SpacerHeader from 'elements/spacer/spacerHeader.svelte';
	import Register from 'elements/login/register.svelte';
	import Login from 'elements/login/login.svelte';

	let currentYear = 2025; // get current year from database

	const inputLineWidth = 30;
	const inputLineSpacer = 1;

	export let displayRegister = false;
	export let headerMenu = [['', '']];
	export let footerMenu = [['', '']];
</script>

<Header menu={headerMenu} />

<div class="page">
	<SpacerHeader />

	<div class="content">
		<div class="content-wrapper">
			{#if displayRegister}
				<Register {inputLineSpacer} />
			{:else}
				<Login {inputLineWidth} {inputLineSpacer} />
			{/if}
		</div>
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

	@media (max-width: 600px) {
		.content {
			margin: 2rem;
		}
	}
</style>
