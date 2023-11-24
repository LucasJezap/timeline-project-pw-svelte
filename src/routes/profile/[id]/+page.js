import { getUser } from "$lib/js/users";
import { error } from "@sveltejs/kit";
import { getUpcomingEvents } from "$lib/js/timeline-events";

export function load({ params }) {
  const user = getUser();

  if (user === undefined) throw error(404);

  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    user: user,
    upcomingEvents,
  };
}