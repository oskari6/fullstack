const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: Boolean,
    required: true,
    minLength: 8,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d+$/.test(value);
      },
      message:
        "Phone number must consist of two parts separated by '-', first part 2–3 digits and second part digits",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
