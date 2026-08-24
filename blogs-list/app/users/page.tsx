import Link from "next/link";
import { getUsers } from "@/app/services/users";

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border rounded p-3 hover:bg-gray-800">
            <Link
              href={`/users/${user.username}`}
              className="text-blue-400 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
