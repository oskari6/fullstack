const { test, expect, describe, beforeEach } = require("@playwright/test");

const mockUser = {
  name: "test-user",
  username: "test-user",
  password: "qwerty12!",
};

const mockBlog = {
  title: "testx",
  author: "testerx",
  url: "localhost",
};

const login = async (page, username) => {
  await page.getByRole("link", { name: "login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(mockUser.password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, blog = mockBlog) => {
  await page.getByRole("link", { name: "new blog" }).click();
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByLabel("title").fill(blog.title);
  await page.getByLabel("author").fill(blog.author);
  await page.getByLabel("url").fill(blog.url);
  await page.getByRole("button", { name: "create" }).click();
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: mockUser,
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("link", { name: "login" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, mockUser.username);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "wrong-username");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    test("a new blog can be created", async ({ page }) => {
      await login(page, mockUser.username);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      await createBlog(page);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();
      await page
        .getByRole("link", { name: `${mockBlog.title} ${mockBlog.author}` })
        .click();
      await expect(
        page.getByText(mockBlog.title, { exact: true }),
      ).toBeVisible();

      await expect(
        page.getByText(mockBlog.author, { exact: true }),
      ).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await login(page, mockUser.username);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      await createBlog(page);
      await page
        .getByRole("link", { name: `${mockBlog.title} ${mockBlog.author}` })
        .click();
      const viewButton = await page.getByRole("button", { name: "view" });
      await viewButton.click();
      const likeButton = await page.getByRole("button", { name: "like" });
      await likeButton.click();
      const blog = page.getByTestId("blog");
      await expect(blog).toContainText("likes 1");
    });

    test("a blog can be removed", async ({ page }) => {
      await login(page, mockUser.username);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      await createBlog(page);
      await page
        .getByRole("link", { name: `${mockBlog.title} ${mockBlog.author}` })
        .click();
      const viewButton = await page.getByRole("button", { name: "view" });
      await viewButton.click();

      page.on("dialog", async (dialog) => {
        await dialog.accept(); // clicks OK
      });
      const removeButton = await page.getByRole("button", { name: "remove" });
      await removeButton.click();

      await expect(page.getByText("blogs")).toBeVisible();
    });

    test.skip("only creator sees remove button", async ({ page, request }) => {
      await login(page, mockUser.username);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      await createBlog(page);
      await page.getByRole("button", { name: "logout" }).click();

      const differentUser = "testuser3";
      await request.post("http://localhost:3001/api/users", {
        data: {
          ...mockUser,
          username: differentUser,
        },
      });
      await login(page, differentUser);
      await createBlog(page);
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      const blogs = page.getByTestId("blog");

      await blogs.nth(0).getByRole("button", { name: "view" }).click();

      await expect(
        blogs.nth(0).getByRole("button", { name: "remove" }),
      ).toHaveCount(0);

      await blogs.nth(1).getByRole("button", { name: "view" }).click();

      await expect(
        blogs.nth(1).getByRole("button", { name: "remove" }),
      ).toBeVisible();
    });

    test.skip("like sorting works", async ({ page }) => {
      await login(page, mockUser.username);

      await createBlog(page, {
        title: "blog 1 like",
        author: "a",
        url: "url1",
      });
      await createBlog(page, {
        title: "blog 2 likes",
        author: "a",
        url: "url2",
      });
      await createBlog(page, {
        title: "blog 3 likes",
        author: "a",
        url: "url3",
      });
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      const blogs = page.getByTestId("blog");

      const blog1 = blogs.filter({ hasText: "blog 1 like" });
      const blog2 = blogs.filter({ hasText: "blog 2 likes" });
      const blog3 = blogs.filter({ hasText: "blog 3 likes" });

      await blog1.getByRole("button", { name: "view" }).click();
      await blog2.getByRole("button", { name: "view" }).click();
      await blog3.getByRole("button", { name: "view" }).click();

      await blog1.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(500);
      for (let i = 0; i < 2; i++) {
        await blog2.getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
      }

      for (let i = 0; i < 3; i++) {
        await blog3.getByRole("button", { name: "like" }).click();
        await page.waitForTimeout(500);
      }

      await expect(blogs.nth(0)).toContainText("blog 3 likes");
      await expect(blogs.nth(1)).toContainText("blog 2 likes");
      await expect(blogs.nth(2)).toContainText("blog 1 like");
    });
  });
});
