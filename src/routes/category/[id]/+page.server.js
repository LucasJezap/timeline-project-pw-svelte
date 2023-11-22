import { addCategory, deleteCategory, getCategory, saveCategory } from "$lib/js/categories";
import { error, redirect } from "@sveltejs/kit";
import { getUser } from "$lib/js/users"
import { getUpcomingEvents } from "$lib/js/timeline-events";

export async function load({ params }) {
  const categoryId = parseInt(params.id);
  let category = getCategory(categoryId);

  if (categoryId == 0) {
    category = {
      id: 0,
      name: "",
      description: "",
      color: "",
    };
  }

  if (category === undefined) throw error(404);

  let user = getUser();
  let upcomingEvents = getUpcomingEvents(user["id"]);

  return {
    category: category,
    user,
    upcomingEvents,
  };
}

export const actions = {
  save: async ({ request, params }) => {
    const data = await request.formData();

    saveCategory(
      parseInt(params.id),
      String(data.get("name")),
      String(data.get("description")),
      String(data.get("color"))

    );
  },

  add: async ({ request }) => {
    const data = await request.formData();

    const categoryId = addCategory(
      String(data.get("name")),
      String(data.get("description")),
      String(data.get("color"))
    );

    throw redirect(302, `/category/${categoryId}`);
  },

  delete: async ({ params }) => {
    deleteCategory(parseInt(params.id));
    throw redirect(302, "/");
  },
};
