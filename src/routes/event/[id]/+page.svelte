<script>
  import "$lib/css/event.css";
  import MultiSelect from "svelte-multiselect";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { saveEvent, deleteEvent, addEvent } from "$lib/js/timeline-events";
  import { getUser } from "$lib/js/users";

  export let data;

  let searchText = "";
  let loading = false;
  let options = [];
  let selected = [];
  data["categories"].forEach((category) => {
    options = [...options, category["name"]];
    if (category["check"]) {
      selected = [...selected, category["name"]];
    }
  });

  $: if (searchText) {
    loading = true;
    setTimeout(async () => {
      loading = false;
    }, 1000);
  }

  let fileName = "";

  let fallbackImage = "undraw_poster.png";
  const handleImageError = (ev) => (ev.target.src = fallbackImage);
  const handleImageUpload = (ev) => (fileName = ev.target.files[0].name);

  let submitMessages = {
    errors: [],
    success: "",
  };

  let submitFunction = "";
  const submit = function (e) {
    if (submitFunction === "add") {
      addSubmit(e);
    } else if (submitFunction === "save") {
      saveSubmit(e);
    } else if (submitFunction === "delete") {
      deleteSubmit(e);
    }
  };

  const addSubmit = function (e) {
    const formData = new FormData(e.target);
    submitMessages["errors"] = [];

    submitMessages["errors"] = [];

    let title = formData.get("title");
    if (title === "" || title === null || title === undefined) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Title is required!",
      ];
    }

    let start = new Date(formData.get("start") + "Z");
    if (isNaN(start)) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Start Date is required!",
      ];
    }

    let end = new Date(formData.get("end") + "Z");
    if (isNaN(end)) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "End Date is required!",
      ];
    }

    if (start.getTime() >= end.getTime()) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "End Date must be after Start Date!",
      ];
    }

    let category = formData.get("category");
    if (category === "[]") {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Categories are required!",
      ];
    }

    if (submitMessages["errors"].length > 0) {
      return;
    }

    let event = addEvent(
      getUser()["id"],
      String(title),
      String(formData.get("description")),
      String(category),
      start,
      end
    );

    submitMessages["success"] = "Added successfully";
    setTimeout(() => {
      submitMessages["success"] = "";
    }, 2000);

    goto("/event/" + event);
  };

  const saveSubmit = function (e) {
    const formData = new FormData(e.target);
    submitMessages["errors"] = [];

    let title = formData.get("title");
    if (title === "" || title === null || title === undefined) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Title is required!",
      ];
    }

    let start = new Date(formData.get("start") + "Z");
    if (isNaN(start)) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Start Date is required!",
      ];
    }

    let end = new Date(formData.get("end") + "Z");
    if (isNaN(end)) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "End Date is required!",
      ];
    }

    if (start.getTime() >= end.getTime()) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "End Date must be after Start Date!",
      ];
    }

    let category = formData.get("category");
    if (category === "[]") {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Categories are required!",
      ];
    }

    if (submitMessages["errors"].length > 0) {
      return;
    }

    saveEvent(
      parseInt($page.params.id),
      String(title),
      String(formData.get("description")),
      String(category),
      start,
      end
    );

    submitMessages["success"] = "Added successfully";
    setTimeout(() => {
      submitMessages["success"] = "";
    }, 2000);
  };

  const deleteSubmit = function () {
    deleteEvent(parseInt($page.params.id));

    goto("/");
  };

  const uploadSubmit = function () {
    submitMessages["errors"] = [];
    submitMessages["errors"] = [
      ...submitMessages["errors"],
      "Not available in SPA!",
    ];
  };
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
              <form
                on:submit|preventDefault={uploadSubmit}
                enctype="multipart/form-data"
              >
                <label for="file-upload" class="custom-file-upload d-block">
                  {#if fileName === ""}
                    <i class="fa fa-cloud-upload" /> Upload Image
                  {:else}
                    <i class="fa fa-cloud-upload" /> {fileName}
                  {/if}
                </label>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  style="display:none;"
                  on:change={handleImageUpload}
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
      <form on:submit|preventDefault={submit}>
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
              <MultiSelect
                id="category"
                name="category"
                bind:options
                bind:selected
                bind:searchText
                {loading}
              />
            </div>
          </div>

          <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3">
              {#if submitMessages["errors"].length > 0}
                <div class="alert alert-danger">
                  <ul>
                    {#each submitMessages["errors"] as message}
                      <li>{message}</li>
                    {/each}
                  </ul>
                </div>
              {:else if submitMessages["success"] !== ""}
                <div class="alert alert-success">
                  <ul>
                    <li>{submitMessages["success"]}</li>
                  </ul>
                </div>
              {/if}
            </div>
            <div class="col-md-6 pt-md-0 pt-3">
              <div class="mt-5 text-right">
                {#if data["event"]["id"] === 0}
                  <button
                    type="submit"
                    class="btn btn-info submitBtn"
                    on:click={() => (submitFunction = "add")}
                  >
                    Add Event
                  </button>
                {:else}
                  <button
                    type="submit"
                    class="btn btn-danger submitBtn"
                    on:click={() => (submitFunction = "delete")}
                  >
                    Delete Event
                  </button>
                  <button
                    type="submit"
                    class="btn btn-info submitBtn"
                    on:click={() => (submitFunction = "save")}
                  >
                    Save Event
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
