<script>
  import { Table } from "sveltestrap";
  import { page } from "$app/stores";

  export let title;
  let data = $page.data.data;

  let sortBy = { col: "id", ascending: true };
  let symbolMap = {};
  Object.keys(data[0]).forEach((colName) => {
    symbolMap[colName] = "fa-solid fa-sort";
  });

  $: sort = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending;
      symbolMap[column] =
        symbolMap[column] === "fa-solid fa-sort-up"
          ? "fa-solid fa-sort-down"
          : "fa-solid fa-sort-up";
    } else {
      sortBy.col = column;
      sortBy.ascending = true;
      for (let s in symbolMap) {
        symbolMap[s] = "fa-solid fa-sort";
      }
      symbolMap[column] = "fa-solid fa-sort-up";
    }

    // Modifier to sorting function for ascending or descending
    let sortModifier = sortBy.ascending ? 1 : -1;

    let sort = (a, b) =>
      a[column] < b[column]
        ? -1 * sortModifier
        : a[column] > b[column]
        ? 1 * sortModifier
        : 0;

    data = data.sort(sort);
  };
</script>

<h4>{title}</h4>
<Table responsive>
  <thead>
    <tr>
      {#each Object.keys(data[0]) as colName}
        <th on:click={sort(colName)}
          ><nobr>{colName + " "}<i class={symbolMap[colName]} /></nobr></th
        >
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each Object.keys(row) as colName}
          <td>{row[colName]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
