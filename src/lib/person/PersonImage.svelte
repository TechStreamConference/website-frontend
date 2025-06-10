<script lang="ts">
    import type { Person } from '@/types/provideTypes';

    import { image_url } from '@/helper/links';

    export let classes: string = '';

    export let data: Person;
</script>

<img class={classes}
     src={image_url(data.photo)}
     alt={'Profilbild von ' + data.name} />
