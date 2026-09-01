import Link from "next/link";
import type { ReadingListEntry } from "@/types/readingList";

interface UnreadProps {
  unreadEntries: ReadingListEntry[];
  formatBlogEntry: (id: number) => Promise<string>;
};

export default function Unread({ unreadEntries, formatBlogEntry}: UnreadProps) {
  return (
    <>
      <p className="font-bold text-xl">Unread({unreadEntries.length})</p>
      
      {unreadEntries.length === 0 ? (
        <p className="mt-2">No entries left to read</p>
      ) : (
        <ul className="m-5">
          {unreadEntries.map((e) => (
            <li
              key={e.id}
              className="list-disc p-1"
            >
              <Link
                href={`/blogs/${e.blogId}`}
                className="text-blue-400 hover:underline"
              >
                {formatBlogEntry(Number(e.blogId))}
              </Link>
              <button className="border-green-700 bg-green-700 rounded-xl p-1 ml-3">
                Mark as read
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
