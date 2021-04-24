//import { addNewContact, getContacts } from "../controllers/crmController";
import express from "express";
import {
  getHeroByID,
  getHeroesByNameFilter,
} from "../controllers/heroController";
import {
  getComicByID,
  getComicsByNameFilter,
} from "../controllers/comicController";
import {
  getMovieByID,
  getMoviesByNameFilter,
} from "../controllers/movieController";

const router = express.Router();

router.get("/hero/:heroID", getHeroByID);
router.get("/hero/name/:heroName", getHeroesByNameFilter);

router.get("/comic/:comicID", getComicByID);
router.get("/comic/name/:comicName", getComicsByNameFilter);

router.get("/movie/:movieID", getMovieByID);
router.get("/movie/name/:movieName", getMoviesByNameFilter);

//const routes = (app) => {
// app.route("/hero/:heroID").get(getHeroByID);
//app.route("/hero/name/:heroName").get(getHeroesByNameFilter);

// app.route("/").get((req, res) => {
//   res.json({
//     message: "Root",
//   });
// });

// app.route("/testCollection").get((req, res) => {
//   res.json({ messages: "abc" });
// });

// //route for post request
// app.route("/contact").post(addNewContact);

// //route for get request
// app.route("/contacts").get(getContacts);
//};

module.exports = router;
