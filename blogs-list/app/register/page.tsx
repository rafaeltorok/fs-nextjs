import { registerUser } from "../actions/users";
import "../formRow.css";

export default function RegisterPage() {
  return (
    <div>
      <h2>Register</h2>
      <form action={registerUser}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" required />
        </div>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" required />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
