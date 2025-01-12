<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadSpeakerTalk } from 'types/dashboardLoadTypes';

    import { Clone } from 'helper/clone';
    import { getElementByTitle } from 'helper/basic';
    import { loadTalkFromEventIDAsync } from './talkHelper';
    import { setUnsavedChanges } from 'stores/saved';
    import { SaveMessageType } from 'types/saveMessageType';

    import Tabs from 'elements/navigation/tabs.svelte';
    import NavigationDropDown from 'elements/navigation/navigationDropDown.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Button from 'elements/input/button.svelte';
    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';

    export let data: LoadSpeakerTalk;
    let saveMessage: SaveMessage;

    async function save(): Promise<boolean> {
        if (!data.currentTalk) {
            saveMessage.setSaveMessage(SaveMessageType.Error);
            return false;
        }

        saveMessage.setSaveMessage(SaveMessageType.Save);
        return true;
    }

    async function updateDisplayedEvent(selected: string): Promise<void> {
        const current    = getElementByTitle(data.allEvent, selected);
        data.allTalks    = await loadTalkFromEventIDAsync(fetch, current.event_id);
        data.currentTalk = data.allTalks.length > 0 ? new Clone(data.allTalks[0]) : undefined;
    }

    function updateDisplayedTalk(selected: string): void {
        data.currentTalk = new Clone(getElementByTitle(data.allTalks, selected));
    }
</script>


<Tabs entries={Menu.speaker}
      entryName={MenuItem.speakerTalk.name}
      classes="navigation-tabs-dashboard-subpage" />
<UnsavedChangesCallbackWrapper callback={save} />

<SectionDashboard classes="standard-dashboard-section">
    <SaveMessage bind:this={saveMessage} />
    <NavigationDropDown id="dashboard-speaker-talk-event-navigation"
                        labelText="Event:"
                        data={ data.allEvent.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedEvent(e.detail); }} />
    <NavigationDropDown id="dashboard-speaker-talk-talk-navigation"
                        labelText="Talk:"
                        data={ data.allTalks.map(x => x.title) }
                        on:navigated={ (e) => { updateDisplayedTalk(e.detail); }} />

    {#if data.currentTalk === undefined}
        <TextLine>Kein aktueller Talk ausgewählt.</TextLine>
    {:else }
        <form on:submit|preventDefault={save}>
            <Input id="dashboard-speaker-talk-input-title"
                   labelText="Titel:"
                   placeholderText="Titel"
                   ariaLabel="Gebe hier den Titel des Talks ein"
                   bind:value={data.currentTalk.value.title}
                   on:input={setUnsavedChanges} />
            <TextArea id="dashboard-speaker-talk-input-description"
                      labelText="Beschreibung:"
                      placeholderText="Beschreibung"
                      ariaLabel="Gebe hier die Beschreibung des Talks ein"
                      bind:value={data.currentTalk.value.description}
                      on:input={setUnsavedChanges}
                      on:submit={save} />
            <Button type="submit"
                    ariaLabel="Klicke, um den Talk zu speichern">Speichern
            </Button>
        </form>
    {/if}
</SectionDashboard>
