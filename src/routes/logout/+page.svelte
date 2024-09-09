<script lang="ts">
	import { goto } from '$app/navigation';

	async function logout(): Promise<void> {
		const response: Response = await fetch('api/account/logout', { method: 'POST' });
		if (!response.ok) {
			return;
		}
		goto('/');
	}

	logout();
</script>

<p>Logging out...</p>
