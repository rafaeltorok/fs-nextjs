import Link from "next/link";
import { getUsers } from "../services/users";

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="border rounded p-3 hover:bg-gray-600"
          >
            <Link
              href={`/users/${user.id}`}
              className="text-blue-100 hover:underline"
            >{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
