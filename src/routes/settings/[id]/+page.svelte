<script>
  import "$lib/css/profile.css";
  import { saveUserSettings } from "$lib/js/user-settings";
  import { getUser, changePassword } from "$lib/js/users";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  if (getUser()["id"] !== parseInt($page.params.id)) {
    goto("/");
  }

  export let data;

  let submitMessages = {
    errors: [],
    errors2: [],
    success: "",
    success2: ""
  };

  let successMsg = localStorage.getItem("success_msg");
  if (successMsg !== "" && successMsg !== null && successMsg !== undefined) {
    submitMessages["success"] = successMsg;
    localStorage.setItem("success_msg", "");
    setTimeout(() => {
      submitMessages["success"] = "";
    }, 2000);
  }

  const changeSubmit = function(e) {
    const formData = new FormData(e.target);
    submitMessages["errors2"] = [];

    let oldPassword = formData.get("old_password");
    if (oldPassword === "" || oldPassword === null || oldPassword === undefined) {
      submitMessages["errors2"] = [
        ...submitMessages["errors2"],
        "Old Password is required!",
      ];
    } else if (getUser()["password"] !== oldPassword) {
      submitMessages["errors2"] = [
        ...submitMessages["errors2"],
        "Wrong Password!",
      ];
    }

    let newPassword = formData.get("new_password");
    let newPasswordConfirmation = formData.get("new_password_confirmation");
    if (newPassword === "" || newPassword === null || newPassword === undefined) {
      submitMessages["errors2"] = [
        ...submitMessages["errors2"],
        "New Password is required!",
      ];
    } else if (newPassword !== newPasswordConfirmation) {
      submitMessages["errors2"] = [
        ...submitMessages["errors2"],
        "Passwords do not match!",
      ];
    } else if (newPassword === oldPassword) {
      submitMessages["errors2"] = [
        ...submitMessages["errors2"],
        "You cannot use the same password!",
      ];
    } 

    if (submitMessages["errors2"].length > 0) {
      return;
    }

    submitMessages["success2"] = "Saved successfully";
    setTimeout(() => {
      submitMessages["success2"] = "";
    }, 2000);

    changePassword(
      String(newPassword)
    );
  }

  const saveSubmit = function(e) {
    const formData = new FormData(e.target);
    submitMessages["errors"] = [];
    
    let notificationDaysBefore = formData.get("notification_days_before");
    if (notificationDaysBefore === "" || notificationDaysBefore === null || notificationDaysBefore === undefined) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Notification Days Before is required!",
      ];
    } else if (isNaN(parseInt(notificationDaysBefore))) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Notification Days Before must be a number!",
      ];
    }

    let notificationDaysAfter = formData.get("notification_days_after");
    if (notificationDaysAfter === "" || notificationDaysAfter === null || notificationDaysAfter === undefined) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Notification Days After is required!",
      ];
    } else if (isNaN(parseInt(notificationDaysAfter))) {
      submitMessages["errors"] = [
        ...submitMessages["errors"],
        "Notification Days After must be a number!",
      ];
    }

    if (submitMessages["errors"].length > 0) {
      return;
    }

    saveUserSettings(
      getUser()["id"],
      String(notificationDaysBefore),
      String(notificationDaysAfter)
    );

    localStorage.setItem("success_msg", "Saved successfully");

    window.location.reload();
  }
</script>

<svelte:head>
  <title>Timeline Manager - Profile</title>
</svelte:head>

<div class="wrapper bg-white mt-sm-5">
  <h4 class="pb-4 border-bottom">Account settings</h4>
  <form on:submit|preventDefault={saveSubmit}>
      <div class="py-2">
          <h7>Control the amount of alerts you see</h7>
          <div class="row py-2">
              <div class="col-md-6">
                  <label for="notification_days_before">Alert Days Before</label>
                  <input type="text" class="bg-light form-control" id="notification_days_before"
                         name="notification_days_before" bind:value={data["userSettings"]["notificationDaysBefore"]}>
              </div>
              <div class="col-md-6">
                  <label for="notification_days_after">Alert Days After</label>
                  <input type="text" class="bg-light-subtle form-control" id="notification_days_after"
                         name="notification_days_after"
                         bind:value={data["userSettings"]["notificationDaysAfter"]}>
              </div>
          </div>
          <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3">
              <input type="submit" value="Save Changes" class="btn btn-xs btn-info pull-right">
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
  <form on:submit|preventDefault={changeSubmit}>
      <div class="py-2">
          <h7>Change password</h7>
          <div class="row py-2">
              <div class="col-md-6">
                  <label for="old_password">Old Password</label>
                  <input type="password" class="bg-light form-control" id="old_password"
                         name="old_password">
              </div>
          </div>
          <div class="row py-2">
              <div class="col-md-6">
                  <label for="new_password">New Password</label>
                  <input type="password" class="bg-light form-control" id="new_password"
                         name="new_password">
              </div>
              <div class="col-md-6">
                  <label for="new_password_confirmation">New Password Confirmation</label>
                  <input type="password" class="bg-light form-control" id="new_password_confirmation"
                         name="new_password_confirmation">
              </div>
          </div>
          <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3">
              <input type="submit" value="Change Password" class="btn btn-xs btn-info pull-right">
            </div>
            <div class="col-md-6 pt-md-0 pt-3">
              {#if submitMessages["errors2"].length > 0}
                <div class="alert alert-danger">
                  <ul>
                    {#each submitMessages["errors2"] as message}
                      <li>{message}</li>
                    {/each}
                  </ul>
                </div>
              {:else if submitMessages["success2"] !== ""}
                <div class="alert alert-success">
                  <ul>
                    <li>{submitMessages["success2"]}</li>
                  </ul>
                </div>
              {/if}
            </div>
          </div>
      </div>
  </form>
</div>
