import Link from "next/link";
import { updateReadStatus } from "@/app/actions/readingList";

// TypeScript types
import type { ReadingListEntry } from "@/types/readingList";

interface UnreadProps {
  unreadEntries: ReadingListEntry[];
  formatBlogEntry: (id: number) => Promise<string>;
}

export default function Unread({
  unreadEntries,
  formatBlogEntry,
}: UnreadProps) {
  return (
    <>
      <p
        className="font-bold text-xl"
        data-testid="unread-section"
      >
        Unread ({unreadEntries.length})
      </p>

      {unreadEntries.length === 0 ? (
        <p className="mt-2 mb-4">No entries left to read</p>
      ) : (
        <ul className="m-5">
          {unreadEntries.map((e) => (
            <li key={e.id} className="list-disc p-1">
              <form action={updateReadStatus}>
                <input type="hidden" name="blog_id" value={e.blogId} />

                <Link
                  href={`/blogs/${e.blogId}`}
                  className="text-blue-400 hover:underline"
                >
                  {formatBlogEntry(Number(e.blogId))}
                </Link>
                <button
                  type="submit"
                  className="border-green-700 bg-green-700 rounded p-1 ml-3 hover:bg-green-500"
                >
                  Mark as read
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
