import Link from "next/link";
import type { ReadingListEntry } from "@/types/readingList"

interface ReadProps {
  readEntries: ReadingListEntry[];
  formatBlogEntry: (id: number) => Promise<string>;
}

export default function Read({ readEntries, formatBlogEntry}: ReadProps) {
  return (
    <>
      <p className="font-bold text-xl">Read({readEntries.length})</p>

      {readEntries.length === 0 ? (
        <p className="mt-2">No entries have been read yet</p>
      ) : (
        <ul className="m-5">
          {readEntries.map((e) => (
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
