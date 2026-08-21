"use client"

import { redirect } from "next/navigation";
import { createNote } from "../../actions/notes";
import { useSession } from "next-auth/react";
import { useActionState } from "react";

export default function NewNote() {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(createNote, { error: "" });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Create a new note</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input type="text" name="content" required />
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="important" />
            Important
          </label>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};
