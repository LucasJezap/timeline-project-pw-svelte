<script>
	import Table from '../../../components/Table.svelte';
	import { users } from '$lib/js/users';
</script>

<svelte:head>
	<title>Timeline Manager - Users</title>
</svelte:head>

<Table title="Users Table" data={users}/>
