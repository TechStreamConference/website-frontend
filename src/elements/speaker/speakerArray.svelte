<script lang="ts">
	import Speaker from './speaker.svelte';
	const numbers: number[] = Array.from({ length: 10 }, (_, i) => i);
</script>

<div class="speaker-wrapper">
	{#each numbers as number}
		<Speaker />
	{/each}
</div>

<style>
	.speaker-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
	}
</style>
