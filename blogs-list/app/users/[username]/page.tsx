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
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs?.length > 0 ? (
          <>
            {user.blogs.map((b) => (
              <li key={b.id}>
                <Link href={`/blogs/${b.id}`}>
                  {b.title} by {b.author}
                </Link>
              </li>
            ))}
          </>
        ) : (
          <p>This user has no blogs</p>
        )}
      </ul>
    </div>
  );
}
