<script>
	import Table from '../../../components/Table.svelte';
	import { timelineEvents } from '$lib/js/timeline-events';
</script>

<svelte:head>
	<title>Timeline Manager - Timeline Events</title>
</svelte:head>

<Table title="Timeline Events Table" data={timelineEvents}/>
