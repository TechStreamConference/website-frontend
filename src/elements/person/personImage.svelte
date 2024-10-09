<script lang="ts">
	import { imageUrl } from 'helper/links';
	import type { Person } from 'types/provideTypes';

	export let classes: string = '';
	export let data: Person;
</script>

<img class={classes} src={imageUrl(data.photo)} alt={'Profilbild von ' + data.name} />
