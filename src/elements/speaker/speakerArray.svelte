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
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
		justify-items: center;
	}
</style>
