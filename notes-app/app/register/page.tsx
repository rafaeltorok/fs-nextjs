import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div>
      <h2>Register</h2>
      <form action={registerUser}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" required />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
