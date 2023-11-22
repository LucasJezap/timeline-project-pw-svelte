import { getUpcomingEvents } from "$lib/js/timeline-events";
import { getUser } from "$lib/js/users"
import { timelineEventsCategories } from "$lib/js/timeline-events-categories"

export function load() {
  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    data: timelineEventsCategories,
    user,
    upcomingEvents,
  };
}