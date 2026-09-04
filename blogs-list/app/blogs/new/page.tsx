"use client";

import { createBlog } from "@/app/actions/blogs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/app/context/NotificationContext";

// Renders each input row on the form
function renderRow(
  label: string,
  type: string,
  name: string,
  required: boolean,
  defaultValue: string | undefined,
) {
  return (
    <div className="flex items-center justify-center">
      <label className="text-left w-1/4">{label}</label>
      {required ? (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required
          className="grid gap-2 mb-2 md:grid-cols-1 bg-gray-700 w-3/4"
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className="grid gap-2 mb-2 md:grid-cols-1 bg-gray-700 w-3/4"
        />
      )}
    </div>
  );
}

export default function NewBlog() {
  const router = useRouter();
  const { data: session } = useSession();
  const initialState = {
    notifications: {
      errors: { title: "", author: "", url: "", year: "" },
      success: false,
    },
    values: { title: "", author: "", url: "", year: "" },
  };
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.notifications.success) {
      showNotification("New blog has been added!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="max-w-xl mx-auto p-6 flex-1 text-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Add new blog</h2>
      <form action={formAction}>
        {renderRow("Title", "text", "title", true, state.values?.title)}
        {state.notifications?.errors?.title && (
          <span className="bg-red-600 p-1 rounded text-white font-bold">
            {state.notifications.errors.title}
          </span>
        )}

        {renderRow("Author", "text", "author", true, state.values?.author)}
        {state.notifications?.errors?.author && (
          <span className="bg-red-600 p-1 rounded text-white font-bold">
            {state.notifications.errors.author}
          </span>
        )}

        {renderRow("URL", "text", "url", true, state.values?.url)}
        {state.notifications?.errors?.url && (
          <span className="bg-red-600 p-1 rounded text-white font-bold">
            {state.notifications.errors.url}
          </span>
        )}

        {renderRow("Year", "number", "year", true, state.values?.year)}
        {state.notifications?.errors?.year && (
          <span className="bg-red-600 p-1 rounded text-white font-bold">
            {state.notifications.errors.year}
          </span>
        )}

        <br />

        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm mt-2"
        >
          Add
        </button>
      </form>
    </div>
  );
}
