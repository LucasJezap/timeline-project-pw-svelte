import { getUserSettings } from "$lib/js/user-settings";
import { getUser } from "$lib/js/users";
import { error } from "@sveltejs/kit";
import { getUpcomingEvents } from "$lib/js/timeline-events";

export function load({ params }) {
  const userSettings = getUserSettings(parseInt(params.id));

  if (userSettings === undefined) throw error(404);

  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    userSettings,
    user,
    upcomingEvents,
  };
}