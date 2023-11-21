<script>
  import "$lib/css/event.css";
  export let data;
</script>

<svelte:head>
  <title>Timeline Manager - Category</title>
</svelte:head>

<div class="container rounded bg-white mt-5">
  <div class="row">
    <div class="col-md-12">
      <form method="post">
        <div class="p-3 py-5">
          <label for="name">Name</label>
          <div class="row mt-2" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                value={data["category"]["name"]}
              />
            </div>
          </div>
          <label for="description">Description</label>
          <div class="row mt-3" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <textarea
                type="text"
                class="form-control"
                id="description"
                name="description"
                rows="3    ">{data["category"]["description"]}</textarea
              >
            </div>
          </div>
          <label for="color">Color</label>
          <div class="row mt-3" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <input
                type="color"
                class="form-control"
                id="color"
                name="color"
                value={data["category"]["color"]}
              />
            </div>
          </div>
          <div class="mt-5 text-right">
            {#if data["category"]["id"] === 0}
              <button
                type="submit"
                class="btn btn-info submitBtn"
                formaction="?/add"
              >
                Add Category
              </button>
            {:else}
              <button
                type="submit"
                class="btn btn-danger submitBtn"
                formaction="?/delete"
              >
                Delete Category
              </button>
              <button
                type="submit"
                class="btn btn-info submitBtn"
                formaction="?/save"
              >
                Save Category
              </button>
            {/if}
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
