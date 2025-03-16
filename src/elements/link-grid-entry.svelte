<script lang="ts">
    import TextLine from 'elements/text/textLine.svelte';
    import Button from 'elements/input/button.svelte';
    import Link from 'elements/text/link.svelte';
    import Icon from './image/icon.svelte';

    export var visible: boolean;
    export var description: string;
    export var link: string;

    function copy(): void {
        navigator.clipboard.writeText(link);
    }
</script>

{#if visible}
    <TextLine>{description}</TextLine>
    <Link title="Klicke hier, um"
          classes="link-inline word-break"
          newTab={true}
          href={link}>
        {link}
    </Link>
    <Button ariaLabel="Klicke hier, um den link in die Zwischenablage zu kopieren"
            buttonSize="small-button"
            fontSize="small-text"
            on:click={copy}><Icon type="Copy"></Icon>
    </Button>
{/if}
