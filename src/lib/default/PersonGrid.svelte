<script lang="ts">
    import type {Person} from '@/types/provideTypes';

    import PersonRectangle from '@/lib/default/PersonRectangle.svelte';

    export let person_popup_callback: (event: Event, person: Person) => void;

    export let classes: string = '';
    export let person_data: Person[];
</script>

<div class={classes}>
    {#each person_data as person}
        <PersonRectangle
                data={person}
                on:click={(event) => {
				person_popup_callback(event, person);
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
