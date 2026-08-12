import Link from "next/link";
import { getBlogs } from "../services/blogs";

// TypeScript types
import type { Blog } from "@/types/blog";

// CSS styles
import "../blogList.css";

// Server component
export default function Blogs() {
  const blogs: Blog[] = getBlogs();

  return (
    <div>
      <h2>Blogs</h2>
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
