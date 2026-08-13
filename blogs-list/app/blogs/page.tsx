import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { updateRoute } from "../actions/search";

// TypeScript types
import type { Blog } from "@/types/blog";

// CSS styles
import "../blogList.css";

// Server component
export default async function Blogs({ searchParams }: { searchParams: Promise<{ filter: string }> }) {
  const { filter } = await searchParams;
  let blogs: Blog[] = await getBlogs();

  // Filter the list of Blogs by title
  if (filter) {
    blogs = blogs.filter((b) => b.title.toLowerCase().includes(filter.toLowerCase().trim()));
  }

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
      
      <div className="blog-list">
        {blogs.toSorted((a, b) => b.likes - a.likes).map((b) => (
          <div key={b.id}>
            <Link
              href={`/blogs/${b.id}`}
            >
              {b.title} by {b.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
