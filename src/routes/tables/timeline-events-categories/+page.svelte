<script>
	import Table from '../../../components/Table.svelte';
	import { timelineEventsCategories } from '$lib/js/timeline-events-categories';
</script>

<svelte:head>
	<title>Timeline Manager - Timeline Events Categories</title>
</svelte:head>

<Table title="Timeline Events Categories Table" data={timelineEventsCategories}/>
