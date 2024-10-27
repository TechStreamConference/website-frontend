<script lang="ts">
	import type { Person } from 'types/provideTypes';

	import PersonRectangle from './personRectangle.svelte';

	export let personPopupCallback: (event: Event, person: Person) => void;

	export let classes: string="";
	export let personData: Person[];
</script>

<div class={classes}>
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
    div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--2x-gap);
        justify-items: center;
    }

    @media (max-width: 1280px) {
        div {
            grid-template-columns: repeat(3, 1fr);
        }
    }


    @media (max-width: 960px) {
        div {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .person-wrapper {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
