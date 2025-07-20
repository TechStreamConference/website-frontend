<script lang="ts">
    type AsyncCallback = () => Promise<boolean>;

    import {onDestroy, onMount} from 'svelte';
    import {setSaveCallback, resetSaveCallback} from 'stores/saveCallback';

    export let callback: AsyncCallback;

    onMount(() => {
        setSaveCallback(callback);
    });

    onDestroy(() => {
        resetSaveCallback();
    });
</script>
