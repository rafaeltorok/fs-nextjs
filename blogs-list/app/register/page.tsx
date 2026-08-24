"use client";

import { registerUser } from "../actions/users";
import { useActionState } from "react";

function renderRow(
  label: string,
  id: string,
  type: string,
  name: string,
  defaultValue: string,
) {
  return (
    <div className="flex items-center justify-center">
      <label htmlFor={id} className="text-left w-1/4">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={defaultValue}
        required
        className="grid gap-2 mb-2 md:grid-cols-1 bg-gray-700 w-3/4"
      />
    </div>
  );
}

export default function RegisterPage() {
  const initialState = {
    errors: { username: "", name: "", password: "" },
    values: { username: "", name: "", password: "" },
  };
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="max-w-xl mx-auto p-6 flex-1 text-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form action={formAction}>
        {renderRow(
          "Username",
          "username",
          "text",
          "username",
          state.values?.username,
        )}
        {state.errors?.username && (
          <span className="notification">{state.errors.username}</span>
        )}

        {renderRow("Name", "name", "text", "name", state.values?.name)}
        {state.errors?.name && (
          <span className="notification">{state.errors.name}</span>
        )}

        {renderRow(
          "Password",
          "password",
          "password",
          "password",
          state.values?.password,
        )}
        {renderRow(
          "Confirm password",
          "password-confirm",
          "password",
          "password-confirm",
          "",
        )}
        {state.errors?.password && (
          <span className="notification">{state.errors.password}</span>
        )}

        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm mt-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
