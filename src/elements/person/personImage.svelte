<script lang="ts">
    import type { Person } from 'types/provideTypes';

    import { imageUrl } from 'helper/links';

    export let classes: string = '';

    export let data: Person;
</script>

<img class={classes}
     src={imageUrl(data.photo)}
     alt={'Profilbild von ' + data.name} />
