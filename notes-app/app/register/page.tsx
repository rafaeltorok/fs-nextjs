import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={registerUser}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700"
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
        >Register</button>
      </form>
    </div>
  );
}
