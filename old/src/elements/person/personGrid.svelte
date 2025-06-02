<script lang="ts">
    import type {Person} from 'types/provideTypes';

    import PersonRectangle from './personRectangle.svelte';

    export let personPopupCallback: (event: Event, person: Person) => void;

    export let classes: string = '';
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
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--2x-gap);
    }
</style>
