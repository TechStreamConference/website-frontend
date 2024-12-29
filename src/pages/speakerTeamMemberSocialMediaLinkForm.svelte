<script lang="ts">
    import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';
    import type { DashboardSocialMediaLink } from 'types/dashboardProvideTypes';

    import { setUnsavedChanges } from 'stores/saved';
    import { getIDFromSocialMediaType } from 'pageHelper/speakerTeamMemberSocials';
    import { createEventDispatcher } from 'svelte';

    import EditSocialMedia from 'elements/input/editSocialMedia.svelte';
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';

    export let showSaveButton = true;
    export let data: LoadDashboard & LoadUserSocials;

    const dispatch = createEventDispatcher();
    let deletePopup: GeneralPopup;

    function addLink(): void {
        const newLink: DashboardSocialMediaLink = {
            approved:             false,
            id:                   0,
            name:                 'Web',
            url:                  '',
            user_id:              data.roles.user_id,
            requested_changes:    null,
            social_media_type_id: getIDFromSocialMediaType(data.socialTypes, 'Web'),
        };
        data.socials                            = [
            ...data.socials,
            newLink,
        ];
    }


</script>

<GeneralPopup
      bind:this={deletePopup}
      headline="Link löschen?"
      text="Gelöschte Links können nicht wiederhergestellt werden."
      acceptButtonText="Löschen"
      denyButtonText="Abbrechen"
      acceptCallback={(value) => {
		if (typeof value === 'number') {
            dispatch('delete', value);
			return;
		}

		console.error('provided entry index from generic popup is not number');
	}}
      denyCallback={() => {}}
></GeneralPopup>

<form on:submit|preventDefault={() => dispatch('save')}>
    <EditSocialMedia
          links={data.socials}
          socialMediaTypes={data.socialTypes.map((x) => x.name)}
          deleteCallback={(e) => {
				deletePopup.show(e);
			}}
          on:input={setUnsavedChanges}
    />
    <div class="dashboard-social-media-links-button-wrapper">
        <Button ariaLabel="Klicke hier, um einen neuen Link hinzuzufügen"
                on:click={addLink}
        >Neu
        </Button>
        {#if showSaveButton}
            <Button ariaLabel="Klicke hier, um die Eingaben zu speichern"
                    type={'submit'}
            >Speichern
            </Button>
        {/if}
    </div>
</form>

<style>
    .dashboard-social-media-links-button-wrapper {
        display:         flex;
        flex-direction:  row;
        gap:             var(--full-gap);
        margin-top:      var(--4x-gap);
        justify-content: center;
    }
</style>
