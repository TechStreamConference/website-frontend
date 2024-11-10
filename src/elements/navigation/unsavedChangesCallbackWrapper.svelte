<script lang="ts">
	type AsyncCallback = () => Promise<boolean>;

	import { onDestroy, onMount } from 'svelte';
	import UnsavedChangesPopup from './unsavedChangesPopup.svelte';

	export let component: UnsavedChangesPopup;
	export let callback: AsyncCallback;

	onMount(() => {
		component.callback = callback;
	});

	onDestroy(() => {
		component.callback = undefined;
	});
</script>
