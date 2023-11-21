<script>
	import Table from '../../../components/Table.svelte';
	import { categories } from '$lib/js/categories';
</script>

<svelte:head>
	<title>Timeline Manager - Categories</title>
</svelte:head>

<Table title="Categories Table" data={categories}/>