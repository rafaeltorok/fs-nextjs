"use client";

import { registerUser } from "../actions/users";
import { useActionState } from "react";

import "../formRow.css";

function renderRow(
  label: string,
  id: string,
  type: string,
  name: string,
  defaultValue: string,
) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={name} defaultValue={defaultValue} required />
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
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        {renderRow("Username", "username", "text", "username", state.values?.username)}
        {state.errors?.username && <span className="notification">{state.errors.username}</span>}

        {renderRow("Name", "name", "text", "name", state.values?.name)}
        {state.errors?.name && <span className="notification">{state.errors.name}</span>}
        
        {renderRow("Password", "password", "password", "password", state.values?.password)}
        {renderRow("Confirm password", "password-confirm", "password", "password-confirm", "")}
        {state.errors?.password && <span className="notification">{state.errors.password}</span>}

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
