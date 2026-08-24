"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              className="grid gap-6 mb-6 md:grid-cols-1 bg-gray-700"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
        >Login</button>
      </form>
    </div>
  );
}
