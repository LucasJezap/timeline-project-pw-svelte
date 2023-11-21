<script>
	import Table from '../../../components/Table.svelte';
	import { userSettings } from '$lib/js/user-settings';
</script>

<svelte:head>
	<title>Timeline Manager - User settings</title>
</svelte:head>

<Table title="User Settings Table" data={userSettings}/>
