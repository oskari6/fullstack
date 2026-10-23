import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe } from "vitest";
import blogService from "../../services/blogs";
import { BlogForm } from "../BlogForm";

describe("blog form unitests", () => {
  test("filling form sends right object", async () => {
    const user = userEvent.setup();
    const createMock = vi.spyOn(blogService, "create").mockResolvedValue({
      title: "test-title",
      author: "test-author",
      url: "test-url",
    });

    render(
      <MemoryRouter>
        <BlogForm onCreate={() => {}} />
      </MemoryRouter>,
    );

    await user.click(screen.getByText("create new blog"));

    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");

    await user.type(titleInput, "test-title");
    await user.type(authorInput, "test-author");
    await user.type(urlInput, "test-url");

    await user.click(screen.getByText("create"));

    expect(createMock).toHaveBeenCalledTimes(1);

    expect(createMock).toHaveBeenCalledWith({
      title: "test-title",
      author: "test-author",
      url: "test-url",
    });
  });
});
