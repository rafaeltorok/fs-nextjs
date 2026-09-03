import { redirect } from "next/navigation";
import { auth } from "../auth";
import ReadingList from "../components/me/ReadingList";

// Server actions
import { generateToken } from "../actions/users";

// Services
import { getUserToken } from "../services/users";
import { getReadingList } from "../services/readingList";
import { getBlogById } from "../services/blogs";

// TypeScript types
import type { ReadingListEntry } from "@/types/readingList";

// Return the format containing title and author
async function formatBlogEntry(id: number) {
  const blog = await getBlogById(id);
  return `${blog?.title} by ${blog?.author}`;
}

// Separate the entries based on the read/unread status
function filterReadAndUnread(entries: ReadingListEntry[]) {
  const read = entries.filter((e) => e.read === true);
  const unread = entries.filter((e) => e.read === false);
  return {
    read,
    unread,
  };
}

export default async function MePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch the currently logged in user's token from the users table
  const userToken = await getUserToken(Number(session.user?.id));

  // Get the user's reading list entries
  const readingListEntries = await getReadingList(Number(session.user?.id));

  // Filter the entries based on the read/unread status
  const filteredEntries = filterReadAndUnread(readingListEntries);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p>
          <strong>Name:</strong> {session.user?.name}
        </p>
        <p>
          <strong>Username:</strong> {session.user?.email}
        </p>
      </div>

      <hr className="my-10" />

      <ReadingList
        readingListEntries={readingListEntries}
        filteredEntries={filteredEntries}
        formatBlogEntry={formatBlogEntry}
      />

      <hr className="my-10" />

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">API Token</h2>
        <form action={generateToken}>
          <p>Current token:</p>
          {!userToken?.token ? (
            <>
              <p>No token has been generated yet...</p>
            </>
          ) : (
            <>
              <p>
                <strong>{String(userToken.token)}</strong>
              </p>
            </>
          )}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 px-3 py-1 rounded text-sm mt-4"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  );
}
