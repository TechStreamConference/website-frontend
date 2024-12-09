<script lang="ts">
	import SpeakerTeamMemberSocialMediaLinks from 'pages/speakerTeamMemberSocialMediaLinks.svelte';
	import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';

	export let data: LoadDashboard & LoadUserSocials;
</script>

<SpeakerTeamMemberSocialMediaLinks {data} />
