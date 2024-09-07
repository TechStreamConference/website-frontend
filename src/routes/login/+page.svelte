<script>
	import Login from '../login-register.svelte';

	const headerMenu = [['Start', '/ ']];
	const footerMenu = [
		['Registrieren', '/register'],
		['Impressum', '/impressum']
	];
</script>

<Login {headerMenu} {footerMenu} />
