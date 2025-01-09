<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminTimeSlots } from 'types/dashboardLoadTypes';

    import { setUnsavedChanges } from 'stores/saved';
    import { error } from '@sveltejs/kit';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import NavigationDropDown from 'elements/navigation/NavigationDropDown.svelte';
    import Button from 'elements/input/button.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import { onMount } from 'svelte';

    export let data: LoadAdminTimeSlots;

    let currentEventID: number;

    onMount(() => {
        const callback = () => {
            if (data === undefined) {
                setTimeout(callback, 500);
                return;
            }
            if (data.allEvents.length === 0) {
                setTimeout(callback, 500);
                return;
            }
            updateDisplayed(data.allEvents[0].title);
        };

        callback();
    });

    function getIDFromTitle(title: string): number {
        for (const entry of data.allEvents) {
            if (entry.title === title) {
                return entry.id;
            }
        }

        console.log(`not able to look up ID for ${title}`);
        throw error(404);
    }

    function updateDisplayed(value: string) {
        currentEventID = getIDFromTitle(value);
        console.log(value);
    }

    async function save(): Promise<boolean> {
        console.log('save');
        return true;
    }
</script>

<UnsavedChangesCallbackWrapper callback={save} />
<SectionDashboard classes="standard-dashboard-section">
    <Tabs classes="navigation-tabs-dashboard-subpage"
          entries={Menu.admin}
          entryName={MenuItem.adminEventSlots.name} />
    <NavigationDropDown id="dashboard-admin-time-slots-event-drop-down"
                        labelText="Aktuelles Event:"
                        data={data.allEvents.map(x=>x.title)}
                        on:navigated={(e) => {updateDisplayed(e.detail);}} />

    <Button ariaLabel=""
            on:click={setUnsavedChanges}>TEST
    </Button>

</SectionDashboard>
