<script>
	import { page } from '$app/stores';
</script>

{#if $page.error}
	<h1>{$page.error.message}</h1>
{:else}
	<h1>Yikes! An unknown error has occured</h1>
{/if}
