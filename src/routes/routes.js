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
import {
  getRandomMovie,
  getRandomMovies,
} from "../controllers/movieController";
import {
  getRandomComic,
  getRandomComics,
} from "../controllers/comicController";
import { getRandomQuote } from "../controllers/quoteController";
import { getRandomImages } from "../controllers/comicController";

const router = express.Router();

router.get("/hero/:heroID", getHeroByID);
router.get("/hero/name/:heroName", getHeroesByNameFilter);

router.get("/comic/:comicID", getComicByID);
router.get("/comic/name/:comicName", getComicsByNameFilter);

router.get("/movie/:movieID", getMovieByID);
router.get("/movie/name/:movieName", getMoviesByNameFilter);

router.get("/movierandom", getRandomMovie);
router.get("/moviesrandom", getRandomMovies);

router.get("/comicrandom", getRandomComic);
router.get("/comicsrandom", getRandomComics);
router.get("/randomcomicimages/:number", getRandomImages);

router.get("/quote", getRandomQuote);

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
