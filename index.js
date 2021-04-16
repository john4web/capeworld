import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes/routes";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); //Used to parse JSON bodies. bodyParser is deprecated!
routes(app);

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/capeworld", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
