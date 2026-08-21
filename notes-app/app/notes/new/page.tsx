import { redirect } from "next/navigation";
import { createNote } from "../../actions/notes";
import { auth } from "@/app/auth";

export default async function NewNote() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Create a new note</h2>
      <form action={createNote}>
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
      </form>
    </div>
  );
};
