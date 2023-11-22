import { getUpcomingEvents } from "$lib/js/timeline-events";
import { getUser, users } from "$lib/js/users"

export function load() {
  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    data: users,
    user,
    upcomingEvents,
  };
}