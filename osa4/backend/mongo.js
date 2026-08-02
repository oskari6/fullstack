const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

const connectDb = async () => {
  mongoose.set("strictQuery", false);
  console.log("connecting to", url);
  mongoose
    .connect(url, { family: 4 })
    .then((result) => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
};

module.exports(connectDb);
