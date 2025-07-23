<script lang="ts">
    import {onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import {unsavedChanges} from 'stores/saved';

    import DropDown2 from 'elements/input/dropDown2.svelte';
    import ManualUnsavedChangesPopup from 'elements/popups/manualUnsavedChangesPopup.svelte';

    export let id: string;
    export let labelText: string;
    export let classes: string = '';

    let selected: string;
    let displayed: string;

    export let data: string[];

    let popup: ManualUnsavedChangesPopup;
    const dispatch = createEventDispatcher();

    onMount(() => {
        displayed = selected;
    });

    $: if (selected) {
        checkSelected();
    }

    function checkSelected(): void {
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

    export function trySetSelected(value: string): void {
        if (data.includes(value)) {
            selected = value;
            checkSelected();
            return;
        }
    }

    export function getSelected(): string {
        return selected;
    }

    export function clear(): void {
        // notice that the drop-down data are bound in html.
        // They clear when the provided data are cleared.
        // When I would clear it here, Svelte would overwrite it anyway.
        selected = "";
        displayed = "";
    }

</script>

<ManualUnsavedChangesPopup bind:this={popup}
                           navigateCallback={onNavigate}
                           stayCallback={onStay}/>
<DropDown2 {classes}
          {id}
          {labelText}
          bind:selected={selected}
          {data}/>
