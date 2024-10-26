<script lang="ts">
	import { resetUnsavedChanges, unsavedChanges } from 'stores/saved';
	import { beforeNavigate, goto } from '$app/navigation';
	import Button from 'elements/input/button.svelte';
	import { fade } from 'svelte/transition';
	import SubHeadline from 'elements/text/subHeadline.svelte';

	let intercepted: Record<string, any> | null = null;
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
	<div class="modal" on:click={(e) => e.stopPropagation()} role="presentation">
		<SubHeadline>Es gibt ungespeicherte Änderungen</SubHeadline>
		<div class="button-wrapper">
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

    .modal {
        display: flex;
        flex-direction: column;
        background-color: var(--background-color-light);
        padding: 3rem;
        border: 1px solid var(--line-color);
        border-radius: var(--border-radius);
				gap: 1rem;
				align-items: center;
    }

    .button-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
</style>
