<script lang="ts">
	import type { IconLink } from 'types/provideTypes';
	import DummyIcon from 'delete/dummyIcon.svelte';

	export let links: IconLink[];
</script>

<div class="parent-wrapper">
	<div class="link-wrapper">
		{#each links as link}
			<DummyIcon linkType={link} />
		{/each}
	</div>
</div>

<style>
	.parent-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.link-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem 3rem;
	}
</style>
