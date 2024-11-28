<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
</script>

<div class="dashboard-team-member">
	<Headline classes="headline-border">Team Member</Headline>
</div>
<slot />

<style>
	.dashboard-team-member {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
