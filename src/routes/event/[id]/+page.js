import { getEvent, getUpcomingEvents } from "$lib/js/timeline-events";
import { getTimelineEventCategories } from "$lib/js/timeline-events-categories";
import { error } from "@sveltejs/kit";
import { getUser } from "$lib/js/users";

export function load({ params }) {
  const eventId = parseInt(params.id);
  let event = getEvent(eventId);

  if (eventId == 0) {
    event = {
      id: 0,
      user: 1,
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
      image: "",
    };
  }

  if (event === undefined) throw error(404);

  const eventCategories = getTimelineEventCategories(event["id"]);
  const allCategories = JSON.parse(localStorage.getItem("categories"));

  allCategories.forEach((category) => {
    category["check"] = false;
    eventCategories.forEach((eventCategory) => {
      if (eventCategory["name"] === category["name"]) {
        category["check"] = true;
      }
    });
  });

  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);
  return {
    event: event,
    categories: allCategories,
    user,
    upcomingEvents,
  };
}