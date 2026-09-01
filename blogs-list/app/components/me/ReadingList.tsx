// Components
import Unread from "./Unread";
import Read from "./Read";

// TypeScript types
import type { ReadingListEntry } from "@/types/readingList";

interface ReadingListProps {
  readingListEntries: ReadingListEntry[];
  filteredEntries: {
    read: ReadingListEntry[],
    unread: ReadingListEntry[],
  };
  formatBlogEntry: (id: number) => Promise<string>;
};

export default function ReadingList({
  readingListEntries,
  filteredEntries,
  formatBlogEntry,
}: ReadingListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-10">Reading List</h2>
      {readingListEntries?.length === 0 ? (
        <p>No entries available</p>
      ) : (
        <>
          <Unread
            unreadEntries={filteredEntries.unread}
            formatBlogEntry={formatBlogEntry}
          />

          <Read
            readEntries={filteredEntries.read}
            formatBlogEntry={formatBlogEntry}
          />
        </>
      )}
    </div>
  );
}
