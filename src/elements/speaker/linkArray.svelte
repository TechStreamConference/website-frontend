<script lang="ts">
	import type { IconLink } from 'types/provideTypes';
	import DummyIcon from 'delete/dummyIcon.svelte';

	export let links: IconLink[];
</script>

<div class="link-wrapper">
	{#each links as link}
		<DummyIcon linkType={link} />
	{/each}
</div>

<style>
	.link-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
		width: 100%;
	}
</style>
