import { getUpcomingEvents } from "$lib/js/timeline-events";
import { getUser } from "$lib/js/users"

export function load() {
  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    data: JSON.parse(localStorage.getItem("timeline_event_categories")),
    user,
    upcomingEvents,
  };
}