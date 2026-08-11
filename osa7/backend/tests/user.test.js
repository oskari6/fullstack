// const bcrypt = require("bcrypt");
// const supertest = require("supertest");
// const app = require("../app");
// const User = require("../models/user");
// const { test, beforeEach, describe } = require("node:test");
// const helper = require("./test_helper");
// const assert = require("node:assert");

// const api = supertest(app);

// beforeEach(async () => {
//   await User.deleteMany({});

//   const passwordHash = await bcrypt.hash("sekret", 10);
//   const user = new User({ username: "root", passwordHash });

//   await user.save();
// });

// describe("when there is initially one user at db", () => {
//   test("creation succeeds with a fresh username", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: "mluukkai",
//       name: "Matti Luukkainen",
//       password: "salainen",
//     };

//     await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(201)
//       .expect("Content-Type", /application\/json/);

//     const usersAtEnd = await helper.usersInDb();
//     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

//     const usernames = usersAtEnd.map((u) => u.username);
//     assert(usernames.includes(newUser.username));
//   });
// });

// describe("creating users conflicts", () => {
//   test("creating a user with no password", async () => {
//     const newUser = {
//       username: "root",
//       name: "Superuser",
//     };

//     const response = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     assert.strictEqual(
//       response.body,
//       "Password not given or shorter than 3 characters",
//     );
//   });
//   test("creating a user with too short password", async () => {
//     const newUser = {
//       username: "root",
//       name: "Superuser",
//       password: "12",
//     };

//     const response = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     assert.strictEqual(
//       response.body,
//       "Password not given or shorter than 3 characters",
//     );
//   });
//   test("creating a user with no username", async () => {
//     const newUser = {
//       name: "Superuser",
//       password: "1234",
//     };

//     const response = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     assert.strictEqual(
//       response.body,
//       "username not given or shorter than 3 characters",
//     );
//   });
//   test("creating a user with too short username", async () => {
//     const newUser = {
//       name: "Superuser",
//       username: "12",
//       password: "1234",
//     };

//     const response = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     assert.strictEqual(
//       response.body,
//       "username not given or shorter than 3 characters",
//     );
//   });
//   test("creating a user with existing username", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       name: "Superuser",
//       username: usersAtStart[0].username,
//       password: "1234",
//     };

//     const response = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     assert.strictEqual(
//       response.body.error,
//       "user exists already with this username",
//     );
//   });
// });
