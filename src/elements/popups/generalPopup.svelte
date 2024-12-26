<script lang="ts">
    import Button from 'elements/input/button.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import BasePopup from './basePopup.svelte';

    export let acceptCallback: <T>(content: T) => void;
    export let denyCallback: <T>(content: T) => void;

    export let headline: string;
    export let text: string;
    export let acceptButtonText: string;
    export let denyButtonText: string;

    let content: unknown = undefined;
    let basePopup: BasePopup;

    export function show<T>(value: T) {
        content = value;
        basePopup.show();
    }

    export function hide() {
        deny();
    }

    function reset() {
        content = undefined;
        basePopup.hide();
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

<BasePopup bind:this={basePopup}
           on:close={deny}>
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
</BasePopup>

<style>
    .general-popup-button-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }
</style>
