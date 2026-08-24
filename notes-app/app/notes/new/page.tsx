"use client"

import { redirect } from "next/navigation";
import { createNote } from "../../actions/notes";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/app/context/NotificationContext";
import { useRouter } from "next/navigation";

export default function NewNote() {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(createNote, { 
    error: "",
    success: false,
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("note created");
      router.push("/notes");
    }
  }, [state, showNotification, router]);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new note</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input
              type="text"
              name="content"
              required
              className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="important"
            />
            Important
          </label>
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
        >Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};
