<script lang="ts">
	import Headline from 'elements/text/headline.svelte';
</script>

<div class="dashboard-speaker">
	<Headline classes="headline-border">Speaker</Headline>
</div>
<slot />

<style>
	.dashboard-speaker {
		max-width: 100rem;
		margin: var(--2x-margin) auto 0;
	}
</style>
