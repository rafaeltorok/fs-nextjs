import { notFound } from "next/navigation"
import { getNoteById } from "../../services/notes"
import { toggleNoteImportance } from "@/app/actions/notes"
import "../../styles/notes.css";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const note = await getNoteById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <form action={toggleNoteImportance}>
        <div className="note-importance-area">
          <p>{note.important ? "Important" : "Not important"}</p>
          <input type="hidden" name="id" value={note.id} />
          <button type="submit">
            {note.important ? "✘" : "✔"}
          </button>
        </div>
      </form>
    </div>
  )
}
