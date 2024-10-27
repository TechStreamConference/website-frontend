<script lang="ts">
	import type { Person } from 'types/provideTypes';
	import PersonRectangle from './personRectangle.svelte';

	export let personData: Person[];

	export let personPopupCallback: (event: Event, person: Person) => void;
</script>

<div class="person-wrapper">
	{#each personData as person}
		<PersonRectangle
			data={person}
			on:click={(event) => {
				personPopupCallback(event, person);
			}}
		/>
	{/each}
</div>

<style>
    .person-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--2x-gap);
        justify-items: center;
    }

    @media (max-width: 1280px) {
        .person-wrapper {
            grid-template-columns: repeat(3, 1fr);
        }
    }


    @media (max-width: 960px) {
        .person-wrapper {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .person-wrapper {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
