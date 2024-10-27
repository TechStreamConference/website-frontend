<script lang="ts">
	import { resetUnsavedChanges, unsavedChanges } from 'stores/saved';
	import { beforeNavigate, goto } from '$app/navigation';
	import Button from 'elements/input/button.svelte';
	import { fade } from 'svelte/transition';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	let intercepted: Record<string, unknown> | null = null;
	let url: URL;

	beforeNavigate(({ to, cancel }) => {
		if (!unsavedChanges()) return;

		cancel();

		if (to) {
			intercepted = { url: to.url };
			url = to.url;
		}
	});
</script>

<dialog
	open={intercepted !== null}
	on:click={() => (intercepted = null)}
	role="presentation"
	transition:fade={{ duration: 300 }}
>
	<div class="unsaved-changes-modal" on:click={(e) => e.stopPropagation()} role="presentation">
		<SubHeadline classes="white">Es gibt ungespeicherte Änderungen</SubHeadline>
		<div class="unsaved-changes-button-wrapper">
			<Button
				on:click={() => (intercepted = null)}
				ariaLabel="Klicke hier, um auf der Seite zu bleiben"
			>
				Auf Seite bleiben
			</Button>
			<Button
				on:click={() => {
				intercepted = null;
				resetUnsavedChanges();
				goto(url);
			}}
				ariaLabel="Klicke hier, um die Seite zu verlassen"
			>
				Seite verlassen
			</Button>
		</div>
	</div>
</dialog>

<style>
    dialog {
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: var(--background-color-transparent);
        z-index: 20;
        justify-content: center;
        align-items: center;
    }

    dialog[open] {
        display: flex;
    }

    .unsaved-changes-modal {
        display: flex;
        flex-direction: column;
        background-color: var(--background-color-light);
        padding: var(--2x-padding);
        border: 1px solid var(--line-color);
        border-radius: var(--border-radius);
				gap: var(--full-gap);
				align-items: center;
    }

    .unsaved-changes-button-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
    }
</style>
