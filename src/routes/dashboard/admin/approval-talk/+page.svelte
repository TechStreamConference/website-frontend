<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminApprovalTalk } from 'types/dashboardLoadTypes';
    import type { DashboardAllPendingTalks, DashboardAllTentativeOrAcceptedTalks } from 'types/dashboardProvideTypes';

    import { fetchTentativeTalks, getUserIds } from './approvalHelper';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import AdminPendingTalkApprovalFormWrapper from 'forms/adminPendingTalkApprovalFormWrapper.svelte';
    import AdminTentativeTalkApprovalFormWrapper from 'forms/adminTentativeTalkApprovalFormWrapper.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    export let data: LoadAdminApprovalTalk;

    enum DataType {
        Pending,
        Tentative,
    }

    function getElementsByUserID<T extends {
        speaker: {
            user_id: number
        }
    }>(elements: T[], userID: number): T[] {
        return elements.filter((entry) => entry.speaker.user_id === userID);
    }

    function getNameByUserID(
        pending: DashboardAllPendingTalks,
        tentative: DashboardAllTentativeOrAcceptedTalks,
        userID: number,
    ): string {
        const filter = <T extends {
            speaker: {
                user_id: number,
                name: string
            }
        }>(elements: T[]): string | undefined => {
            for (const element of elements) {
                if (element.speaker.user_id === userID) {
                    return element.speaker.name;
                }
            }
        };

        let result = filter(pending);
        if (result) {
            return result;
        }
        result = filter(tentative);
        return result ? result : '';
    }

    function deleteEntry(type: DataType, id: number): void {
        setTimeout(() => {
            switch (type) {
                case DataType.Pending:
                    data.pendingTalks = data.pendingTalks.filter((talk) => talk.id !== id);
                    break;
                case DataType.Tentative:
                    data.tentativeTalks = data.tentativeTalks.filter((talk) => talk.id !== id);
                    break;
            }
            data.userIDArray = getUserIds(data.pendingTalks, data.tentativeTalks);
        }, 3000);
    }

    async function moveTalk(id: number): Promise<void> {
        setTimeout(async () => {
            const tentativeTalksPromise = fetchTentativeTalks(fetch);
            data.pendingTalks           = data.pendingTalks.filter((talk) => talk.id !== id);
            data.tentativeTalks         = await tentativeTalksPromise;
            data.userIDArray            = getUserIds(data.pendingTalks, data.tentativeTalks);
        }, 3000);
    }
</script>

<Tabs classes="navigation-tabs-dashboard-subpage"
      entries={Menu.admin}
      entryName={MenuItem.adminApprovalTalk.name} />

<SectionDashboard classes="standard-dashboard-section dashboard-admin-talk-approval-section">
    {#each data.userIDArray as userID}
        <div class="dashboard-admin-talk-approval-wrapper">
            <SubHeadline classes="sub-headline-center">{getNameByUserID(data.pendingTalks,
                                                                        data.tentativeTalks,
                                                                        userID
            )}</SubHeadline>
            <AdminPendingTalkApprovalFormWrapper talks={getElementsByUserID(data.pendingTalks, userID)}
                                                 on:reject={(e) => deleteEntry(DataType.Pending, e.detail)}
                                                 on:approve={(e) => moveTalk(e.detail)} />
            <AdminTentativeTalkApprovalFormWrapper talks={getElementsByUserID(data.tentativeTalks, userID)}
                                                   slots={data.slots}
                                                   on:reject={(e) => deleteEntry(DataType.Tentative, e.detail)} />
        </div>
    {/each}
</SectionDashboard>

<style>
    :global(.dashboard-admin-talk-approval-section) {
        gap: var(--4x-gap) !important;
    }

    .dashboard-admin-talk-approval-wrapper {
        display:        flex;
        flex-direction: column;
        gap:            var(--4x-gap);
        border:         1px solid var(--primary-color-dark);
        border-radius:  var(--border-radius);
        padding:        var(--full-padding);
    }
</style>
