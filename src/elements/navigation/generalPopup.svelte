<script lang="ts">
    import Button from 'elements/input/button.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import {fade} from 'svelte/transition';

    export let acceptCallback: <T>(content: T) => void;
    export let denyCallback: <T>(content: T) => void;

    export let headline: string;
    export let text: string;
    export let acceptButtonText: string;
    export let denyButtonText: string;

    let _show: boolean = false;
    let content: any = undefined;

    export function show<T>(value: T) {
        content = value;
        _show = true;
    }

    function reset() {
        content = undefined;
        _show = false;
    }

    function accept() {
        if (!acceptCallback) {
            console.error('acceptCallback is empty');
            return;
        }

        acceptCallback(content);
        reset();
    }

    function deny() {
        if (!denyCallback) {
            console.error('denyCallback is empty');
            return;
        }

        denyCallback(content);
        reset();
    }
</script>

<dialog open={_show}
        on:click={deny}
        role="presentation"
        transition:fade={{ duration: 300 }}>
    <div class="general-popup-modal"
         on:click={(e) => e.stopPropagation()}
         role="presentation">
        <SubHeadline classes="white">{headline}</SubHeadline>
        <Paragraph>{text}</Paragraph>
        <div class="general-popup-button-wrapper">
            <Button on:click={deny}
                    ariaLabel="Klicke hier, um die Abfrage zu verneinen"
            >{denyButtonText}</Button
            >
            <Button on:click={accept}
                    ariaLabel="Klicke hier, um die Abfrage zu aktzeptern"
            >{acceptButtonText}</Button
            >
        </div>
    </div>
</dialog>

<style>
    dialog {
        top:              0;
        left:             0;
        height:           100vh;
        width:            100vw;
        background-color: var(--background-color-transparent);
        z-index:          20;
        justify-content:  center;
        align-items:      center;
    }

    dialog[open] {
        display: flex;
    }

    .general-popup-modal {
        display:          flex;
        flex-direction:   column;
        background-color: var(--background-color-light);
        padding:          var(--2x-padding);
        border:           1px solid var(--line-color);
        border-radius:    var(--border-radius);
        gap:              var(--full-gap);
        align-items:      center;
    }

    .general-popup-button-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }
</style>
