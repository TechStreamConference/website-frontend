<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
</script>

<div class="dashboard-user">
	<Headline classes="headline-border">User</Headline>
</div>
<slot />

<style>
	.dashboard-user {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
