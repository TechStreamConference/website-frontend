<script lang="ts">
	import Image from './image.svelte';

	export let classes: string = '';
</script>

<Image
	{classes}
	src={'/logo_small.png'}
	alt="Das kleine Tech Stream Conference Logo. Es zeigt den Schriftzug auf schwarzen Wolken. Test ist in Großbuchstaben und weiß / grün. conf in Kleinbuchstaben darunter und weiß."
/>
