import { categories } from "$lib/js/categories";
import {
  addEvent,
  saveEvent,
  getEvent,
  uploadEventImage,
  deleteEvent,
  getUpcomingEvents,
} from "$lib/js/timeline-events";
import { getTimelineEventCategories } from "$lib/js/timeline-events-categories";
import { error, fail, redirect } from "@sveltejs/kit";
import { writeFileSync } from "fs";
import { getUser } from "$lib/js/users"

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
  const allCategories = categories;

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

export const actions = {
  save: async ({ request, params }) => {
    const data = await request.formData();

    saveEvent(
      parseInt(params.id),
      String(data.get("title")),
      String(data.get("description")),
      String(data.get("category")),
      new Date(data.get("start") + "Z"),
      new Date(data.get("end") + "Z")
    );
  },

  add: async ({ request, params }) => {
    const data = await request.formData();

    const eventId = addEvent(
      1,
      String(data.get("title")),
      String(data.get("description")),
      String(data.get("category")),
      new Date(data.get("start") + "Z"),
      new Date(data.get("end") + "Z")
    );

	throw redirect(302, `/event/${eventId}`);
  },

  delete: async ({ params }) => {
    deleteEvent(parseInt(params.id));
    throw redirect(302, "/");
  },

  upload: async ({ request, params }) => {
    const formData = Object.fromEntries(await request.formData());

    if (!formData.file.name || formData.file.name === "undefined") {
      return fail(400, {
        error: true,
        message: "You must provide a file to upload",
      });
    }

    const filename = `images/${params.id}.${formData.file.name
      .split(".")
      .pop()}`;
    writeFileSync(
      `static/event/${filename}`,
      Buffer.from(await formData.file.arrayBuffer())
    );

    uploadEventImage(parseInt(params.id), filename);
  },
};
