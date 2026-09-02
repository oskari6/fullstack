"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: "",
    username: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              className="bg-gray-200 border-1"
              type="text"
              name="username"
              required
              defaultValue={state.username}
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              className="bg-gray-200 border-1"
              type="text"
              name="name"
              required
              defaultValue={state.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              className="bg-gray-200 border-1"
              type="password"
              name="password"
              required
              defaultValue={state.password}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm password
            <input
              className="bg-gray-200 border-1"
              type="password"
              name="passwordConfirm"
              required
              defaultValue={state.passwordConfirm}
            />
          </label>
        </div>
        <button className="bg-blue-200 border-1" type="submit">
          Register
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
}
