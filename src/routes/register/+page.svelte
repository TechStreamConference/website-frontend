<script>
	import Login from '../login-register.svelte';

	const headerMenu = [['Start', '/']];
	const footerMenu = [
		['Anmelden', '/login'],
		['Impressum', '/impressum']
	];
</script>

<Login {headerMenu} {footerMenu} displayRegister={true} />
