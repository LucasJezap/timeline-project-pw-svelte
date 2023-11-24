<script>
  import "$lib/css/event.css";
  import { goto } from '$app/navigation';
  import { page } from "$app/stores";
  import {addCategory, saveCategory, deleteCategory} from "$lib/js/categories"

  export let data;

  let submitFunction = "";
  const submit = function(e) {
    if (submitFunction === "add") {
      addSubmit(e);
    } else if (submitFunction === "save") {
      saveSubmit(e);
    } else if (submitFunction === "delete") {
      deleteSubmit(e);
    }
  }
  
  const addSubmit = function(e) {
    const formData = new FormData(e.target);
    
    let category = addCategory(
      String(formData.get("name")),
      String(formData.get("description")),
      String(formData.get("color"))
    );

    goto("/category/" + category)
  }

  const saveSubmit = function(e) {
    console.log(e);
    const formData = new FormData(e.target);
    
    saveCategory(
      parseInt($page.params.id),
      String(formData.get("name")),
      String(formData.get("description")),
      String(formData.get("color"))
    );
  }

  const deleteSubmit = function() {    
    deleteCategory(
      parseInt($page.params.id)
    );

    goto("/");
  }
</script>

<svelte:head>
  <title>Timeline Manager - Category</title>
</svelte:head>

<div class="container rounded bg-white mt-5">
  <div class="row">
    <div class="col-md-12">
      <form on:submit|preventDefault={submit}>
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
                on:click={() => submitFunction = "add"}
              >
                Add Category
              </button>
            {:else}
              <button
                type="submit"
                class="btn btn-danger submitBtn"
                on:click={() => submitFunction = "delete"}
              >
                Delete Category
              </button>
              <button
                type="submit"
                class="btn btn-info submitBtn"
                on:click={() => submitFunction = "save"}
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
