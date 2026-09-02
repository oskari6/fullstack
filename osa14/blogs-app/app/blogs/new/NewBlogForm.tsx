"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blogs";
import { useNotification } from "../../components/NotificationContext";

export const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    title: "",
    author: "",
    url: "",
    success: false,
  });

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("note created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <form action={formAction}>
      <div>
        <label>
          Title
          <input
            className="bg-gray-200 border-1"
            type="text"
            name="title"
            required
            defaultValue={state.title}
          />
        </label>
        {state.error && state.error.includes("title") && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}
      </div>
      <div>
        <label>
          Author
          <input
            className="bg-gray-200 border-1"
            type="text"
            name="author"
            required
            defaultValue={state.author}
          />
        </label>
        {state.error && state.error.includes("author") && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}
      </div>
      <div>
        <label>
          URL
          <input
            className="bg-gray-200 border-1"
            type="text"
            name="url"
            required
            defaultValue={state.url}
          />
        </label>
        {state.error && state.error.includes("url") && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}
      </div>
      <button
        data-testid="create-blog-button"
        className="bg-blue-200 border-1"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
