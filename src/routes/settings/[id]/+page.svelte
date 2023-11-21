<script>
  import "$lib/css/profile.css";
  export let data;
</script>

<svelte:head>
  <title>Timeline Manager - Profile</title>
</svelte:head>

<div class="wrapper bg-white mt-sm-5">
  <h4 class="pb-4 border-bottom">Account settings</h4>
  <form action="?/save" method="post">
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
          <div class="py-3 pb-4 border-bottom">
              <input type="submit" value="Save Changes" class="btn btn-xs btn-info pull-right">
          </div>
      </div>
  </form>
  <form action="?/change" method="post">
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
          <div class="py-3 pb-4 border-bottom">
              <input type="submit" value="Change Password" class="btn btn-xs btn-info pull-right">
          </div>
      </div>
  </form>
</div>
