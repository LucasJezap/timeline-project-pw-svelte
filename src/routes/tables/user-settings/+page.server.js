import { getUpcomingEvents } from "$lib/js/timeline-events";
import { getUser } from "$lib/js/users"
import { userSettings } from "$lib/js/user-settings"

export function load() {
  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    data: userSettings,
    user,
    upcomingEvents,
  };
}