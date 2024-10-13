<script lang="ts">
	import type { Person } from 'types/provideTypes';

	export let speaker: Person;
</script>

<button class="button text" on:click aria-label="Mehr Informationen zu {speaker.name}"
	>{speaker.name}</button
>

<style>
	.button {
		background: none;
		border: none;
		transition: background-color var(--transition-duration);
		box-sizing: content-box;
		border-radius: var(--border-radius);
	}

	.button:hover {
		background-color: var(--gray-color);
		transition: background-color var(--transition-duration);
	}

	.text {
		padding: 1rem 2rem;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--white-color);
	}
</style>
