## Running tests

There are several things you should do to set up the tests for your project.

### Changes in your submission repository

Copy the directories _tests_ and _.github_ from this repository to the root of your submission repository.

Replace the file _drizzle.config.ts_ in your repository with the one you find in this directory.

Install the following:

```js
npm install --save-dev @playwright/test dotenv
npx playwright install
```

Add scripts to _package.json_:

```
{
  // ...
  scripts:{
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
  }
}
```

### Test DB and repository secrets

Create a new Neon DB in Vercel

Set up environment variables for your GitHub repository:

Click Settings → Secrets and variables → Actions

- Add these repository secrets:
  - DATABASE_URL - Your Neon test database URL
  - NEXTAUTH_SECRET - any_random_character_sequence
  - NEXTAUTH_URL - Use http://localhost:3000

Create file _.env.local_ to your submission repository with following

```bash
DATABASE_URL=your_neon_test_database_URL
NEXTAUTH_SECRET=any_random_character_sequence
NEXTAUTH_URL=http://localhost:3000
```

### Running tests

You can run tests locally with _npm run test:e2e_

### Assumptions that tests make

Tests are making several assumptions on your UI:

- form controls must have labels "Username", "Password", "Title", etc.
- urls: "login", "blogs", "me", etc.
- test IDs

Eg. the below tests assumes that the url of the creation form is _/blogs/new_, form controls have the labels and eg. the creation button has test id _create-blog-button_:

```js
test("logged in user can create a blog", async ({ page }) => {
  await loginUser(page, "testuser", "testpass123")

  await page.goto("/blogs/new")
  await page.getByLabel("Title", { exact: true }).fill("Test Blog")
  await page.getByLabel("Author", { exact: true }).fill("Test Author")
  await page.getByLabel("URL", { exact: true }).fill("http://testblog.com")
  await page.getByTestId("create-blog-button").click()

  // Should redirect to blogs page
  await expect(page).toHaveURL("/blogs")

  // Should show success notification
  await expect(page.getByTestId("notification")).toBeVisible()

  // Blog should appear in the list
  await expect(page.getByTestId("blogs-list")).toContainText("Test Blog")
})
```

The test id is added to the button with prop _data-testid_:

```js
<button
  type="submit"
  data-testid="create-blog-button"
  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
  {...props}
>
  Create
</button>
```

See the tests for more!

### Tests in GitHub

Commit _.github_ to your submission repository and push it to GitHub
