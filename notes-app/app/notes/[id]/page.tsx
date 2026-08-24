import { notFound } from "next/navigation";
import { getNoteById } from "../../services/notes";
import { toggleNoteImportance } from "@/app/actions/notes";
import "../../styles/notes.css";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNoteById(Number(id));

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{note.content}</h2>
      <form action={toggleNoteImportance}>
        <div className="note-importance-area">
          <p
            className="ml-2 text-amber-600"
          >{note.important ? "Important" : "Not important"}</p>
          <input type="hidden" name="id" value={note.id} />
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
          >{note.important ? "✘" : "✔"}</button>
        </div>
      </form>
    </div>
  );
}
