import { getUser, saveUser, uploadUserImage } from "$lib/js/users";
import { error, fail } from "@sveltejs/kit";
import { writeFileSync } from "fs";

export function load({ params }) {
  const user = getUser(parseInt(params.id));

  if (user === undefined) throw error(404);

  return {
    user: user,
  };
}

export const actions = {
  save: async ({ request, params }) => {
    const data = await request.formData();

    saveUser(
      parseInt(params.id),
      data.get("name"),
      data.get("first_name"),
      data.get("last_name"),
      data.get("phone"),
      data.get("company")
    );
  },

  upload: async ({ request, params }) => {
    const formData = Object.fromEntries(await request.formData());

    if (!formData.file.name || formData.file.name === "undefined") {
      return fail(400, {
        error: true,
        message: "You must provide a file to upload",
      });
    }

    const filename = `avatars/${params.id}.${formData.file.name
      .split(".")
      .pop()}`;
    writeFileSync(
      `static/profile/${filename}`,
      Buffer.from(await formData.file.arrayBuffer())
    );

    uploadUserImage(parseInt(params.id), filename);
  },
};
