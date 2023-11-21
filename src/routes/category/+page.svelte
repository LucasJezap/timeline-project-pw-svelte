<script>
  import "$lib/css/event.css";
  export let data;

  let fallbackImage = "undraw_poster.png";
  const handleImageError = (ev) => (ev.target.src = fallbackImage);
</script>

<svelte:head>
  <title>Timeline Manager - Event</title>
</svelte:head>

<div class="container rounded bg-white mt-5">
  <div class="row">
    <div class="col-md-4 border-right">
        {#if data["event"]["id"] !== 0}
      <div class="row">
        <div class="col-md-12 d-flex align-items-center py-3 border-bottom">
          <img
            src={data["event"]["image"]}
            on:error={handleImageError}
            class="img-fluid"
            alt=""
          />
        </div>
        <div
          class="col-md-12 d-flex justify-content-center align-items-center text-center py-3 border-bottom"
        >
          <div class="pl-sm-4 pl-2" id="img-section">
            <b>Poster</b>
            <p>Accepted file type .png.</p>
            <form action="?/upload" method="post" enctype="multipart/form-data">
              <label for="file-upload" class="custom-file-upload d-block">
                <i class="fa fa-cloud-upload" /> Upload Image
              </label>
              <input
                id="file-upload"
                name="file"
                type="file"
                style="display:none;"
              />
              <input
                type="submit"
                value="Save Poster"
                class="btn btn-xs btn-info pull-right"
              />
            </form>
          </div>
        </div>
      </div>
      {/if}
    </div>
    <div class="col-md-8">
      <form method="post">
        <div class="p-3 py-5">
          <label for="title">Title</label>
          <div class="row mt-2" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                value={data["event"]["title"]}
              />
            </div>
          </div>
          <label for="description">Description</label>
          <div class="row mt-3" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <textarea
                class="form-control"
                id="description"
                name="description"
                rows="3    ">{data["event"]["description"]}</textarea
              >
            </div>
          </div>
          <label for="start">Start Date</label>
          <div class="row mt-3" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <input
                type="datetime-local"
                class="form-control"
                id="start"
                name="start"
                value={data["event"]["start"].toISOString().slice(0, 16)}
              />
            </div>
          </div>
          <label for="end">End Date</label>
          <div class="row mt-3" style="margin-bottom: 20px;">
            <div class="col-md-12">
              <input
                type="datetime-local"
                class="form-control"
                id="end"
                name="end"
                value={data["event"]["end"].toISOString().slice(0, 16)}
              />
            </div>
          </div>
          <label for="category">Categories</label>
          <div class="row mt-3" style="margin-bottom: 20px">
            <div class="col-md-12">
              <select
                multiple
                class="form-control"
                id="category"
                name="category"
                aria-label="category"
                style="width:100%;"
              >
                {#each data["categories"] as category}
                  {#if category["check"]}
                    <option selected value={category["name"]}
                      >{category["name"]}</option
                    >
                  {:else}
                    <option value={category["name"]}>{category["name"]}</option>
                  {/if}
                {/each}
              </select>
            </div>
          </div>

          <div class="mt-5 text-right">
            {#if data["event"]["id"] === 0}
            <button
            type="submit"
            class="btn btn-info submitBtn"
            formaction="?/add"
          >
            Add Event
          </button>
          {:else}
          <button
              type="submit"
              class="btn btn-danger submitBtn"
              formaction="?/delete"
            >
              Delete Event
            </button>
          <button
          type="submit"
          class="btn btn-info submitBtn"
          formaction="?/save"
        >
          Save Event
        </button>
            {/if}
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
