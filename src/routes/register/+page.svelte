<script>
	import Login from '../login.svelte';

	const headerMenu = [['Home', '/ ']];
	const footerMenu = [
		['Login', '/login'],
		['Impressum', '/impressum']
	];
</script>

<Login {headerMenu} {footerMenu} displayRegister={true} />
