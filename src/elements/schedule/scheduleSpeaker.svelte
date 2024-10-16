<script lang="ts">
	import type { Person } from 'types/provideTypes';

	export let speaker: Person;
</script>

<button class="button text" on:click aria-label="Mehr Informationen zu {speaker.name}"
	>{speaker.name}</button
>

<style>
	.button {
		transform: translate(-2px);
		padding: 4px;
		background: none;
		border: none;
		transition: background-color var(--transition-duration);
		border-radius: var(--border-radius);
		margin-bottom: 2rem;
		cursor: pointer;
	}

	.button:hover {
		background-color: var(--primary-color-dark);
		transition: background-color var(--transition-duration);
	}

	.button:active {
		background-color: var(--primary-color-light);
		transition: text-decoration-color var(--transition-duration);
	}

	.text {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 1px;
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		color: var(--text-color);
	}
</style>
