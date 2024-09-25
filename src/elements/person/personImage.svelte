<script lang="ts">
	import { personImageUrl } from 'helper/links';
	import type { Person } from 'types/provideTypes';

	export let classes: string = '';
	export let data: Person;
</script>

<img class={classes} src={personImageUrl(data.photo)} alt={'Profilbild von ' + data.name} />
