import { getFilteredEvents } from "$lib/js/timeline-events";
import { getTimelineEventCategories } from "$lib/js/timeline-events-categories";
import { error } from "@sveltejs/kit";

export function load({ cookies }) {
  const filters = ["title", "description", "from", "to", "category"];
  let filterMap = {};
  filters.forEach((filter) => {
    let cookieName = "filter_" + filter;
    let cookieValue = cookies.get(cookieName);
    if (cookieValue !== undefined) {
      filterMap[filter] = cookieValue;
    }
  });

  let timelineEvents = getFilteredEvents(filterMap);
  if (timelineEvents === undefined) throw error(404);

  timelineEvents.forEach((event) => {
    event["categories"] = getTimelineEventCategories(event["id"]);
  });

  return {
    timelineEvents,
  };
}

export const actions = {
  addFilters: async ({ request, cookies }) => {
    const data = await request.formData();

    const filters = ["title", "description", "from", "to", "category"];

    filters.forEach((filter) => {
      let cookieName = "filter_" + filter;
      let v = data.get(filter);
      cookies.set(cookieName, String(v), {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false, // <-- if you want to read it in the browser
      });
    });
  },

  deleteFilters: async ({ cookies }) => {
    const filters = ["title", "description", "from", "to", "category"];

    filters.forEach((filter) => {
      let cookieName = "filter_" + filter;
      cookies.delete(cookieName, { path: "/" });
    });
  },

  sort: async ({ cookies }) => {
    const data = await request.formData();
    console.log(data);
    let cookieName = "sort_by";
    // cookies.set(cookieName, String(v), {
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 365,
    //   httpOnly: false, // <-- if you want to read it in the browser
    // });
  },
};
