<script lang="ts">
	import Message from './message.svelte';
	import { SaveMessageType } from 'types/saveMessageType';

	let type = SaveMessageType.None;
	let timer: number | null = null;

	export function setSaveMessage(value: SaveMessageType): void {
		if (timer) {
			clearTimeout(timer);
		}

		type = value;

		if (type === SaveMessageType.Save) {
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
	<Message classes="message-success-color" message="Gespeichert" />
{:else if type === SaveMessageType.Error}
	<Message message="Fehler beim Speichern." />
{/if}
