<script>
	export let placeholderText = '';
	export let value = '';
	export let id = '';
</script>

<input {id} type="text" name={id} placeholder={placeholderText} bind:value on:input />
