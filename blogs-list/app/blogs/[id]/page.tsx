import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { getUserById } from "@/app/services/users";
import { updateLikeCounter } from "@/app/actions/blogs";

// Helper function
function renderTableRow(label: string, data: string | number | undefined) {
  return (
    <tr className="border-1">
      <th className="bg-gray-800 border-1 p-3 font-normal">{label}</th>
      <td className="bg-gray-900 border-1 p-3 font-bold">{String(data)}</td>
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
  const user = await getUserById(Number(blog?.userId));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <form action={updateLikeCounter} className="flex justify-center">
        <input type="hidden" name="id" value={blog.id} />
        <table className="border-2 bg-black text-center rounded-md w-full max-w-[350px] min-w-[300px]">
          <thead>
            <tr>
              <th colSpan={2} className="text-2xl font-bold p-5">
                {blog.title}
              </th>
            </tr>
          </thead>
          <tbody>
            {renderTableRow("Author", blog.author)}
            {renderTableRow("URL", blog.url)}
            {renderTableRow("Year", blog.year)}
            {renderTableRow("Likes", blog.likes)}
            {renderTableRow("User", user?.name)}
            <tr>
              <th colSpan={2} className="p-3">
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                >
                  Like blog
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
