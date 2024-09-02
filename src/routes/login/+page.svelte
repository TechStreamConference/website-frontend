<script>
	import Login from '../login-register.svelte';

	const headerMenu = [['Home', '/ ']];
	const footerMenu = [
		['Register', '/register'],
		['Impressum', '/impressum']
	];
</script>

<Login {headerMenu} {footerMenu} />
