import { notFound } from "next/navigation";
import Link from "next/link";

// Services
import { getBlogById } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { getReadingListEntry } from "@/app/services/readingList";

// Server actions
import { updateLikeCounter } from "@/app/actions/blogs";
import { addToUserReadingList } from "@/app/actions/readingList";

// Server component
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get the id value from the URL
  const { id } = await params;

  // Get the blog data
  const blog = await getBlogById(Number(id));

  // Get the currently logged in user
  const user = await getCurrentUser();

  if (!blog) {
    notFound();
  }

  // Confirm if the blog is present on the logged in user's reading list
  let blogOnUserReadingList = [];

  if (user) {
    blogOnUserReadingList = await getReadingListEntry(user.id, blog.id);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex flex-col justify-center">
        <input type="hidden" name="blog-id" value={blog.id} />

        <h2 className="text-4xl font-bold p-3">{blog.title}</h2>

        <p className="text-gray-400 p-2">
          by {blog.author} ({blog.year})
        </p>

        <div className="flex p-2 my-1">
          <form action={updateLikeCounter}>
            <input type="hidden" name="id" value={blog.id} />
            <p>
              Likes: <strong>{blog.likes}</strong>
              {user && (
                <button
                  type="submit"
                  className="border-1 border-blue-700 bg-blue-700 hover:bg-blue-500 px-3 py-1 mx-2 rounded"
                >
                  like
                </button>
              )}
            </p>
          </form>

          {user && (
            <>
              {blogOnUserReadingList.length === 0 && (
                <form action={addToUserReadingList}>
                  <input type="hidden" name="blog_id" value={blog.id} />
                  <input type="hidden" name="user_id" value={user.id} />

                  <button
                    type="submit"
                    className="border-1 border-green-700 bg-green-700 hover:bg-green-500 px-3 py-1 mx-2 rounded"
                  >
                    add to reading list
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <Link href={blog.url} className="text-blue-500 hover:underline p-2">
          {blog.url}
        </Link>
      </div>
    </div>
  );
}
