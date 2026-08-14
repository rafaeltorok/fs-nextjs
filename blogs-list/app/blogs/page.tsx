import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { updateRoute } from "../actions/search";

// TypeScript types
import type { Blog } from "@/types/blog";

// CSS styles
import "../blogList.css";

// Server component
export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) {
  const { filter } = await searchParams;
  const blogs: Blog[] = await getBlogs(filter);

  return (
    <div>
      <h2>Blogs</h2>

      <div className="search-field-area">
        <form action={updateRoute}>
          <input
            type="text"
            name="search-field"
            id="search-field"
            placeholder="Search by title..."
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {blogs?.length === 0 ? (
        <h3>No blogs were found.</h3>
      ) : (
        <div className="blog-list">
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((b) => (
              <div key={b.id}>
                <Link href={`/blogs/${b.id}`}>
                  {b.title} by {b.author}
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
