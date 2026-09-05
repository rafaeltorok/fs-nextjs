"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "@/app/context/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
      showNotification(`${username} has logged in`);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 flex-1 text-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p style={{ color: "red" }} data-testid="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <label htmlFor="username" className="text-left w-1/4">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="grid gap-2 mb-2 md:grid-cols-1 bg-gray-700 w-3/4"
          />
        </div>

        <div className="flex items-center justify-center">
          <label htmlFor="password" className="text-left w-1/4">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="grid gap-2 mb-2 md:grid-cols-1 bg-gray-700 w-3/4"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm mt-2"
          data-testid="login-button"
        >
          Login
        </button>
      </form>

      <div className="mt-10 text-left w-[300px] mx-auto text-gray-500">
        <p>Demo account:</p>
        <p>
          Username: <strong>newuser@example.com</strong>
        </p>
        <p>
          Password: <strong>newuser</strong>
        </p>
      </div>
    </div>
  );
}
