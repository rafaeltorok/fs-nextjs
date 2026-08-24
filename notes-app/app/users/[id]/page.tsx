import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithNotes } from "@/app/services/users";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserWithNotes(Number(id));

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p className="text-center">Username: <strong>{user.username}</strong> </p>
      <h3 className="text-xl font-bold mb-4 mt-4">Notes:</h3>
      <ul>
        {user.notes.map((note) => (
          <li
            key={note.id}
            className="text-center"
          >
            <Link
              href={`/notes/${note.id}`}
              className="text-blue-200 hover:underline"
            >{note.content}</Link>
            {note.important && 
              <strong className="ml-2 text-amber-600"> (important)</strong>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
