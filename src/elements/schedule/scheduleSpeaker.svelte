<script lang="ts">
	import type { Person } from 'types/provideTypes';

	export let speaker: Person;

	export let classes: string="";
</script>

<button class="normal-font {classes}" on:click aria-label="Mehr Informationen zu {speaker.name}"
	>{speaker.name}</button
>

<style>
	button {
		transform: translate(-2px);
		padding: var(--quad-padding);
		background: none;
		border: none;
		transition: background-color var(--transition-duration);
		border-radius: var(--border-radius);
		margin-bottom: var(--2x-margin);
		cursor: pointer;
		font-size: var(--full-font-size);
	}

	button:hover {
		background-color: var(--primary-color-dark);
		transition: background-color var(--transition-duration);
	}

	button:active {
		background-color: var(--primary-color-light);
		transition: text-decoration-color var(--transition-duration);
	}
</style>
