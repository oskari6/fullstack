import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe } from "vitest";
import blogService from "../../services/blogs";
import { Blog } from "../Blog";

describe("blog unitests", () => {
  const blog = {
    id: "123",
    title: "title",
    url: "localhost",
    author: "author",
    likes: 5,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();

    vi.spyOn(blogService, "getById").mockResolvedValue(blog);
  });

  const renderBlog = () => {
    render(
      <MemoryRouter initialEntries={["/blogs/123"]}>
        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  test("renders content", async () => {
    renderBlog();

    const title = await screen.findByText("title");
    const author = screen.getByText("author");
    const url = screen.queryByText("localhost");
    const likes = screen.queryByText("likes 5");

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();

    expect(blogService.getById).toHaveBeenCalledWith("123");
  });

  test("shows url and likes after clicking view", async () => {
    const user = userEvent.setup();

    renderBlog();

    await user.click(await screen.findByText("view"));

    expect(screen.getByText("localhost")).toBeDefined();
    expect(screen.getByText("likes 5")).toBeDefined();
  });

  test("pressing like button works", async () => {
    window.localStorage.setItem(
      "loggedNoteappUser",
      JSON.stringify({
        username: "test-user",
      }),
    );

    const updateMock = vi
      .spyOn(blogService, "update")
      .mockImplementation(async (updatedBlog) => updatedBlog);

    const user = userEvent.setup();

    renderBlog();

    await user.click(await screen.findByText("view"));

    await user.click(screen.getByText("like"));
    await user.click(screen.getByText("like"));

    expect(updateMock).toHaveBeenCalledTimes(2);
  });

  test("like button not shown for logged out user", async () => {
    const user = userEvent.setup();

    renderBlog();

    await user.click(await screen.findByText("view"));
    expect(screen.queryByRole("button", { name: "like" })).toBeNull();
  });

  test("only like button shown for non owner", async () => {
    window.localStorage.setItem(
      "loggedNoteappUser",
      JSON.stringify({
        username: "test-user2",
      }),
    );

    vi.spyOn(blogService, "getById").mockResolvedValue({
      ...blog,
      creator: {
        username: "test-user",
      },
    });

    const user = userEvent.setup();

    renderBlog();

    await user.click(await screen.findByText("view"));

    expect(screen.getByRole("button", { name: "like" })).toBeDefined();
    expect(screen.queryByRole("button", { name: "remove" })).toBeNull();
  });

  test("remove button shown for owner", async () => {
    window.localStorage.setItem(
      "loggedNoteappUser",
      JSON.stringify({
        username: "test-user",
      }),
    );

    vi.spyOn(blogService, "getById").mockResolvedValue({
      ...blog,
      creator: {
        username: "test-user",
      },
    });

    const user = userEvent.setup();

    renderBlog();

    await user.click(await screen.findByText("view"));

    expect(screen.getByRole("button", { name: "remove" })).toBeDefined();
    expect(screen.getByRole("button", { name: "like" })).toBeDefined();
  });
});
