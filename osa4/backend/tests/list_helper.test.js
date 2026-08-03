const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        title: "test",
        author: "tester",
        url: "localhost",
        likes: 5,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, blogs[0].likes);
  });
  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        title: "test1",
        author: "tester",
        url: "localhost",
        likes: 5,
      },
      {
        title: "test2",
        author: "tester",
        url: "localhost",
        likes: 5,
      },
      {
        title: "test3",
        author: "tester",
        url: "localhost",
        likes: 5,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 15);
  });

  describe("favorite blog", () => {
    test("of empty list is null", () => {
      const result = listHelper.favoriteBlog([]);
      assert.strictEqual(result, null);
    });
    test("when list has only one blog that is favorite", () => {
      const blogs = [
        {
          title: "test",
          author: "tester",
          url: "localhost",
          likes: 5,
        },
      ];
      const result = listHelper.favoriteBlog(blogs);
      assert.deepStrictEqual(result, blogs[0]);
    });
    test("of a bigger list is return correctly", () => {
      const blogs = [
        {
          title: "test1",
          author: "tester",
          url: "localhost",
          likes: 1,
        },
        {
          title: "test2",
          author: "tester",
          url: "localhost",
          likes: 2,
        },
        {
          title: "test3",
          author: "tester",
          url: "localhost",
          likes: 3,
        },
      ];
      const result = listHelper.favoriteBlog(blogs);
      assert.deepStrictEqual(result, blogs[2]);
    });

    describe("Most blogs", () => {
      test("of empty list is null", () => {
        const result = listHelper.mostBlogs([]);
        assert.strictEqual(result, null);
      });
      test("when list has only one blog that has most blogs", () => {
        const blogs = [
          {
            title: "test",
            author: "tester",
            url: "localhost",
            likes: 5,
          },
        ];
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: "tester", blogs: 1 });
      });
      test("of a bigger list is return correctly", () => {
        const blogs = [
          {
            title: "test1",
            author: "tester2",
            url: "localhost",
            likes: 1,
          },
          {
            title: "test2",
            author: "tester",
            url: "localhost",
            likes: 2,
          },
          {
            title: "test3",
            author: "tester2",
            url: "localhost",
            likes: 3,
          },
        ];
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: "tester2", blogs: 2 });
      });
    });

    describe("Most likes", () => {
      test("of empty list is null", () => {
        const result = listHelper.mostLikes([]);
        assert.strictEqual(result, null);
      });
      test("when list has only one blog that has most likes", () => {
        const blogs = [
          {
            title: "test",
            author: "tester",
            url: "localhost",
            likes: 5,
          },
        ];
        const result = listHelper.mostLikes(blogs);
        assert.deepStrictEqual(result, { author: "tester", likes: 5 });
      });
      test("of a bigger list is return correctly", () => {
        const blogs = [
          {
            title: "test1",
            author: "tester2",
            url: "localhost",
            likes: 5,
          },
          {
            title: "test2",
            author: "tester",
            url: "localhost",
            likes: 2,
          },
          {
            title: "test3",
            author: "tester2",
            url: "localhost",
            likes: 5,
          },
        ];
        const result = listHelper.mostLikes(blogs);
        assert.deepStrictEqual(result, { author: "tester2", likes: 10 });
      });
    });
  });
});
