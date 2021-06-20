import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes/routes";
import mongoose from "mongoose";
import cron from "node-cron";
import { insertNewCharactersInDatabase } from "./src/controllers/heroController";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); //Used to parse JSON bodies.

app.use("/api", routes); // '/api' redirects to the routes specified in routes.js

//Handle Production
if (process.env.NODE_ENV === "production") {
  //when project is deployed, this if statement gets executed

  //set static folder
  app.use(express.static(__dirname + "/public/"));

  //Handle Single-Page-Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/capeworld", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Cronjob - Gets executed every week
cron.schedule("0 0 * * 0", function () {
  insertNewCharactersInDatabase();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
