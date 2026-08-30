const Blog = require("./blog");
const User = require("./user");
const ReadingListEntry = require("./reading_list_entry");
const Session = require("./session");

User.hasMany(Blog);
User.hasMany(Session);
Blog.belongsTo(User);
Session.belongsTo(User);

User.hasMany(ReadingListEntry);
ReadingListEntry.belongsTo(User);

Blog.hasMany(ReadingListEntry);
ReadingListEntry.belongsTo(Blog);

User.belongsToMany(Blog, {
  through: ReadingListEntry,
  as: "readings",
});

Blog.belongsToMany(User, {
  through: ReadingListEntry,
  as: "usersReading",
});

module.exports = {
  Blog,
  User,
  ReadingListEntry,
  Session,
};
