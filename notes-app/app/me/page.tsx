import { auth } from "../auth";
import { redirect } from "next/navigation";
import { generateToken } from "../actions/users";
import { getUserToken } from "../services/users";

export default async function MePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch the currently logged in user's token from the users table
  const userToken = await getUserToken(Number(session.user?.id));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p><strong>Name:</strong> {session.user?.name}</p>
        <p><strong>Username:</strong> {session.user?.email}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">API Token</h2>
        <form action={generateToken}>
          <p>Current token:</p>
          {!userToken?.token ? (
            <>
              <p>No token has been generated yet...</p>
            </>
          ): (
            <>
              <p>{String(userToken.token)}</p>
            </>
          )}
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm mt-4"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  );
}
