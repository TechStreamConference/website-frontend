<script lang="ts">
	import Message from './message.svelte';
	import { isSaveType, SaveMessageType } from 'types/saveMessageType';

	let type = SaveMessageType.None;
	let timer: number | null = null;

	export function setSaveMessage(value: SaveMessageType): void {
		if (timer) {
			clearTimeout(timer);
		}

		type = value;

		if (isSaveType(type)) {
			setTimeout(() => {
				reset();
			}, 3000);
		}
	}

	function reset(): void {
		timer = null;
		type = SaveMessageType.None;
	}
</script>

{#if type === SaveMessageType.Save}
	<Message color="success" message="Gespeichert" />
{:else if type === SaveMessageType.Delete}
	<Message color="success" message="Gelöscht" />
{:else if type === SaveMessageType.Error}
	<Message message="Fehler beim Speichern." />
{:else if type === SaveMessageType.DeleteError}
	<Message message="Fehler beim Löschen." />
{/if}
