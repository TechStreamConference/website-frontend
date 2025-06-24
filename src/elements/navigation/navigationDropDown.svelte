<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { unsavedChanges } from 'stores/saved';

    import DropDown from 'elements/input/dropDown.svelte';
    import ManualUnsavedChangesPopup from 'elements/popups/manualUnsavedChangesPopup.svelte';

    export let id: string;
    export let labelText: string;
    export let classes: string = '';

    let selected: unknown;
    let displayed: unknown;

    export let data: unknown[];

    let popup: ManualUnsavedChangesPopup;
    const dispatch = createEventDispatcher();

    onMount(() => {
        displayed = selected;
    });

    $: if (selected) {
        checkSelected();
    }

    function checkSelected() : void {
        if (selected !== displayed) {
            if (unsavedChanges()) {
                popup.show();
            } else {
                onNavigate();
            }
        }
    }

    function onNavigate(): void {
        displayed = selected;
        dispatch('navigated', displayed);
    }

    function onStay(): void {
        selected = displayed;
    }

    export function trySetSelected(value: unknown): void {
        if (data.includes(value)) {
            selected = value;
            checkSelected();
            return;
        }
    }

    export function getSelected(): unknown {
        return selected;
    }

    export function clear(): void {
        // notice that the drop-down data are bound in html.
        // They clear when the provided data are cleared.
        // When I would clear it here, Svelte would overwrite it anyway.
        selected  = undefined;
        displayed = undefined;
    }

</script>

<ManualUnsavedChangesPopup bind:this={popup}
                           navigateCallback={onNavigate}
                           stayCallback={onStay} />
<DropDown {classes}
          {id}
          {labelText}
          bind:selected={selected}
          {data} />
