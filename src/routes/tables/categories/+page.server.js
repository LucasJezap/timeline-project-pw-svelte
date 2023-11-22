import { getUpcomingEvents } from "$lib/js/timeline-events";
import { getUser } from "$lib/js/users"
import { categories } from "$lib/js/categories"

export function load() {
  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    data: categories,
    user,
    upcomingEvents,
  };
}