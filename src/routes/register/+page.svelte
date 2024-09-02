<script>
	import Login from '../login-register.svelte';

	const headerMenu = [['Home', '/ ']];
	const footerMenu = [
		['Login', '/login'],
		['Impressum', '/impressum']
	];
</script>

<Login {headerMenu} {footerMenu} displayRegister={true} />
