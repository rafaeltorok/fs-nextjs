import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

import type { User } from "@/types/user";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user: User | undefined = await getUserWithBlogs(
    decodeURIComponent(username),
  );

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p className="text-center">
        Username: <strong>{user.username}</strong>{" "}
      </p>
      <h3 className="text-xl font-bold mb-4 mt-8">Blogs</h3>
      <ul className="space-y-2">
        {user.blogs?.length > 0 ? (
          <>
            {user.blogs.map((b) => (
              <li key={b.id} className="border rounded p-3 hover:bg-gray-800">
                <Link
                  href={`/blogs/${b.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {b.title} by {b.author}
                </Link>
              </li>
            ))}
          </>
        ) : (
          <p className="text-center">This user has no blogs</p>
        )}
      </ul>
    </div>
  );
}
