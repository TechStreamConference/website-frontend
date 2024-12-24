<script lang="ts">
    import Label from 'elements/text/label.svelte';
    import {createEventDispatcher} from 'svelte';

    export let ariaLabel: string;
    export let id: string;
    export let labelText: string;

    export let classes: string = '';
    export let placeholderText: string = "";
    export let rows: number = 10;

    export let value: string | number = '';

    const dispatch = createEventDispatcher();

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'Enter') {
            dispatch('submit');
        }
    }
</script>

<div class="{classes}">
    <Label for_={id}>{labelText}</Label>
    <textarea
          class="normal-font"
          {id}
          name={id}
          placeholder={placeholderText}
          bind:value
          on:input
          aria-label={ariaLabel}
          {rows}
          on:keydown={handleKeydown}
    />
</div>

<style>
    div {
        display:        flex;
        flex-direction: column;
        width:          100%;
        height:         100%;
    }

    textarea {
        color:            var(--white-color);
        background-color: var(--primary-color-light);
        border-radius:    var(--border-radius);
        border:           none;
        padding:          var(--half-padding);
        width:            100%;
        height:           100%;
        overflow:         auto;
        resize:           vertical;
        font-size:        var(--full-font-size);
    }
</style>
