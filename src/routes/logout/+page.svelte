<script>
	async function logout() {
		const response = await fetch('api/account/logout', { method: 'POST' });
		if (!response.ok) {
			return;
		}
		window.location.href = '/';
	}

	logout();
</script>

<p>Logging out...</p>
