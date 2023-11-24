<script>
  import "$lib/css/profile.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { getUser, saveUser } from "$lib/js/users";
  import { error } from "@sveltejs/kit";

  if (getUser()["id"] !== parseInt($page.params.id)) {
    goto("/");
  }

  export let data;
  let fileName = "";

  let fallbackImage = "undraw_profile.png";
  const handleImageError = (ev) => (ev.target.src = fallbackImage);
  const handleImageUpload = (ev) => (fileName = ev.target.files[0].name);
  
  let submitMessages = {
    errors: [],
    success: ""
  };

  let successMsg = localStorage.getItem("success_msg");
  if (successMsg !== "" && successMsg !== null && successMsg !== undefined) {
    submitMessages["success"] = successMsg;
    localStorage.setItem("success_msg", "");
    setTimeout(() => {
      submitMessages["success"] = "";
    }, 2000);
  }

  const saveSubmit = function (e) {
    const formData = new FormData(e.target);
    submitMessages["errors"] = [];

    let name = formData.get("name");
    if (name === "" || name === null || name === undefined) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Name is required!",
      ];
    }

    if (submitMessages["errors"].length > 0) {
      return;
    }

    saveUser(
      String(name),
      String(formData.get("first_name")),
      String(formData.get("last_name")),
      String(formData.get("phone")),
      String(formData.get("company"))
    );

    localStorage.setItem("success_msg", "Saved successfully");

    window.location.reload();
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
  <title>Timeline Manager - Profile</title>
</svelte:head>

<div class="wrapper bg-white mt-sm-5 mb-5">
  <h4 class="pb-4 border-bottom">Profile</h4>
  <div class="d-flex align-items-start py-3 border-bottom">
    <img
      src={data["user"]["avatar"]}
      on:error={handleImageError}
      class="img"
      alt=""
    />
    <div class="pl-sm-2 pl-2" id="img-section">
      <b>Profile Photo</b>
      <p>Accepted file type .png.</p>
      <form
        on:submit|preventDefault={uploadSubmit}
        enctype="multipart/form-data"
      >
        <label for="file-upload" class="custom-file-upload">
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
          value="Save Avatar"
          class="btn btn-xs btn-info pull-right"
        />
      </form>
    </div>
  </div>
  <form on:submit|preventDefault={saveSubmit}>
    <div class="py-2">
      <div class="row py-2">
        <div class="col-md-6">
          <label for="email">Username</label>
          <input
            type="text"
            class="bg-light form-control"
            id="name"
            name="name"
            bind:value={data["user"]["name"]}
          />
        </div>
        <div class="col-md-6">
          <label for="email">Email Address</label>
          <input
            type="text"
            disabled
            class="bg-light-subtle form-control"
            id="email"
            name="email"
            bind:value={data["user"]["email"]}
          />
        </div>
      </div>
      <div class="row py-2">
        <div class="col-md-6">
          <label for="firstname">First Name</label>
          <input
            type="text"
            class="bg-light form-control"
            id="first_name"
            name="first_name"
            bind:value={data["user"]["first_name"]}
          />
        </div>
        <div class="col-md-6 pt-md-0 pt-3">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            class="bg-light form-control"
            id="last_name"
            name="last_name"
            bind:value={data["user"]["last_name"]}
          />
        </div>
      </div>
      <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3">
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            class="bg-light form-control"
            id="phone"
            name="phone"
            bind:value={data["user"]["phone"]}
          />
        </div>
        <div class="col-md-6 pt-md-0 pt-3">
          <label for="phone">Company</label>
          <input
            type="tel"
            class="bg-light form-control"
            id="company"
            name="company"
            bind:value={data["user"]["company"]}
          />
        </div>
      </div>
      <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3">
          <input
            type="submit"
            value="Save Changes"
            class="btn btn-xs btn-info pull-right"
          />
        </div>
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
      </div>
    </div>
  </form>
</div>
