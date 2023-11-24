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