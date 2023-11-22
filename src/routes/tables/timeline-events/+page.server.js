import { getUpcomingEvents, timelineEvents } from "$lib/js/timeline-events";
import { getUser } from "$lib/js/users"

export function load() {
  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    data: timelineEvents,
    user,
    upcomingEvents,
  };
}