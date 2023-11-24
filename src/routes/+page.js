import { getFilteredEvents, getUpcomingEvents } from "$lib/js/timeline-events";
import { getTimelineEventCategories } from "$lib/js/timeline-events-categories";
import { error } from "@sveltejs/kit";
import { getUser } from "$lib/js/users"

export function load() {
  const filters = ["title", "description", "from", "to", "category"];
  let filterMap = {};
  filters.forEach((filter) => {
    let filterName = "filter_" + filter;
    let filterValue = localStorage.getItem(filterName);
    if (filterValue !== undefined) {
      filterMap[filter] = filterValue;
    }
  });

  let timelineEvents = getFilteredEvents(filterMap);
  if (timelineEvents === undefined) throw error(404);

  timelineEvents.forEach((event) => {
    event["categories"] = getTimelineEventCategories(event["id"]);
  });

  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    timelineEvents,
    user,
    upcomingEvents,
    showFilterAndSort: true,
  };
}