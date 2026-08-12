"use server"

import { redirect } from "next/navigation";

export async function updateRoute(formData: FormData) {
  const query = formData.get("search-field");
  redirect(`/blogs?filter=${query}`);
}
