import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { updateRoute } from "../actions/search";

// TypeScript types
import type { Blog } from "@/types/blog";

// Server component
export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) {
  const { filter } = await searchParams;
  const blogs: Blog[] = await getBlogs(filter);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <form action={updateRoute} className="flex">
        <input
          type="text"
          name="search-field"
          id="search-field"
          placeholder="Search by title..."
          className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700 w-3/4 p-2 h-10 rounded"
        />
        <button
          type="submit"
          className="bg-gray-900 hover:bg-gray-600 px-3 py-1 rounded text-sm w-1/4 h-10"
        >
          Search
        </button>
      </form>

      {blogs?.length === 0 ? (
        <h3>No blogs were found.</h3>
      ) : (
        <ul className="space-y-2">
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((b) => (
              <li key={b.id} className="border rounded p-3 hover:bg-gray-800">
                <Link
                  href={`/blogs/${b.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {b.title} by {b.author}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
