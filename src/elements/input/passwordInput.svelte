<script>
	export let placeholderText = '';
    export let value = "";
    export let id = "";
</script>

<input {id} type="password" name={id} placeholder={placeholderText} on:input bind:value />
