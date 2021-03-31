import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes/crmRoutes";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); //Used to parse JSON bodies. bodyParser is deprecated!
routes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
