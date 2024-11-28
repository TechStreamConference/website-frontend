<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
</script>

<div class="dashboard-admin">
	<Headline classes="headline-border">Admin</Headline>
</div>
<slot />

<style>
	.dashboard-admin {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
