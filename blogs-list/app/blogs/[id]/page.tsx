import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { getUserWithBlogs } from "@/app/services/users";
import { updateLikeCounter } from "@/app/actions/blogs";

// CSS styles
import "../../blog.css";

// Helper function
function renderTableRow(label: string, data: string | number | undefined) {
  return (
    <tr>
      <th>{label}</th>
      <td>{String(data)}</td>
    </tr>
  );
}

// Server component
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const user = await getUserWithBlogs(Number(blog?.userId));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <form action={updateLikeCounter}>
        <input type="hidden" name="id" value={blog.id} />
        <table>
          <thead>
            <tr>
              <th colSpan={2}>{blog.title}</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRow("Author", blog.author)}
            {renderTableRow("URL", blog.url)}
            {renderTableRow("Year", blog.year)}
            {renderTableRow("Likes", blog.likes)}
            {renderTableRow("User", user?.name)}
            <tr>
              <th colSpan={2}>
                <button type="submit">Like blog</button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
