import { saveUserSettings, getUserSettings } from "$lib/js/user-settings";
import { changePassword, getUser } from "$lib/js/users";
import { error, fail } from "@sveltejs/kit";

export function load({ params }) {
  const userSettings = getUserSettings(parseInt(params.id));

  if (userSettings === undefined) throw error(404);

  return {
    userSettings,
  };
}

export const actions = {
  save: async ({ request, params }) => {
    const data = await request.formData();

    saveUserSettings(
      parseInt(params.id),
      parseInt(data.get("notification_days_before")),
      parseInt(data.get("notification_days_after"))
    );
  },

  change: async ({ request, params }) => {
    const data = await request.formData();
    const old_password = data.get("old_password");
    const new_password = data.get("new_password");
    const new_password_confirmation = data.get("new_password_confirmation");

    if (new_password !== new_password_confirmation) {
      return fail(400, {
        error: true,
        message: "Passwords do not match",
      });
    }

    changePassword(parseInt(params.id), data.get("new_password"));
  },
};
