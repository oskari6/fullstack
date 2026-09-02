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
          {state.error && state.error.includes("username") && (
            <p data-testid="username-error" style={{ color: "red" }}>
              {state.error}
            </p>
          )}
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
          {state.error && state.error.includes("Password must") && (
            <p data-testid="password-error" style={{ color: "red" }}>
              {state.error}
            </p>
          )}
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
          {state.error && state.error.includes("Passwords") && (
            <p data-testid="passwordConfirm-error" style={{ color: "red" }}>
              {state.error}
            </p>
          )}
        </div>
        <button
          data-testi="register-button"
          className="bg-blue-200 border-1"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
