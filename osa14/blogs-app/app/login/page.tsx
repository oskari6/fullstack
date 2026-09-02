"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              className="bg-gray-200 border-1"
              type="text"
              name="username"
              required
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
            />
          </label>
        </div>
        <button className="bg-blue-200 border-1" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
