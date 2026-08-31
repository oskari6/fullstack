const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class ReadingListEntry extends Model {
  toJSON() {
    const values = { ...this.get() };
    values.blog_id = values.blogId;
    values.user_id = values.userId;
    delete values.blogId;
    delete values.userId;
    return values;
  }
}
ReadingListEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "reading_list",
    tableName: "reading_list_entries",
  },
);

module.exports = ReadingListEntry;
