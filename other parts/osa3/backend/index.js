require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDb = require("./mongo.js");
const Person = require("./person.model.js");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    } else {
      return response.json(person);
    }
  });
});

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;
  const person = new Person(newPerson);

  person.save().then((result) => {
    if (!result) {
      return response.status(500).msg("failed to create person").end();
    } else {
      return response.status(201).json(result);
    }
  });
});

app.put("/api/persons/:id", (request, response) => {
  const updatedPerson = request.body;
  if (!updatedPerson.name || !updatedPerson.number) {
    return response.status(400).json({ error: "Request body incomplete" });
  }

  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    } else {
      person.name = updatedPerson.name;
      person.number = updatedPerson.number;

      person.save().then((result) => {
        if (!result) {
          return response.status(500).msg("failed to update person").end();
        } else {
          return response.status(200).json(result);
        }
      });
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findOneAndDelete(request.params.id)
    .then(() => {
      return response.status(203).end();
    })
    .catch((error) => {
      return response.status(500).json("Deleting failed:", error);
    });
});

app.get("/info", async (request, response) => {
  const persons = await Person.find();
  return response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
async function start() {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
