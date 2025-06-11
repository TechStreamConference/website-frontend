<script lang="ts">
    import Button from '@/lib/interact/Button.svelte';
    import Paragraph from '@/lib/text/Paragraph.svelte';
    import SubHeadline from '@/lib/text/SubHeadline.svelte';
    import BasePopup from '@/lib/popup/BasePopup.svelte';

    export let accept_callback: <T>(content: T) => void;
    export let deny_callback: <T>(content: T) => void;

    export let headline: string;
    export let text: string;
    export let accept_button_text: string;
    export let deny_button_text: string;

    let content: unknown = undefined;
    let base_popup: BasePopup;

    export function show<T>(value: T) {
        content = value;
        base_popup.show();
    }

    export function hide() {
        deny();
    }

    function reset() {
        content = undefined;
        base_popup.hide();
    }

    function accept() {
        if (!accept_callback) {
            console.error('acceptCallback is empty');
            return;
        }

        accept_callback(content);
        reset();
    }

    function deny() {
        if (!deny_callback) {
            console.error('denyCallback is empty');
            return;
        }

        deny_callback(content);
        reset();
    }
</script>

<BasePopup bind:this={base_popup}
           on:close={deny}>
    <SubHeadline classes="white">{headline}</SubHeadline>
    <Paragraph>{text}</Paragraph>
    <div class="general-popup-button-wrapper">
        <Button on:click={deny}
                ariaLabel="Klicke hier, um die Abfrage zu verneinen"
        >{deny_button_text}</Button
        >
        <Button on:click={accept}
                ariaLabel="Klicke hier, um die Abfrage zu aktzeptern"
        >{accept_button_text}</Button
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
