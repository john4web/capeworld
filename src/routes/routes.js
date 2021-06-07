//import { addNewContact, getContacts } from "../controllers/crmController";
import express from "express";
import {
  getHeroByID,
  getHeroesByNameFilter,
  getTrendiestHero,
} from "../controllers/heroController";
import {
  getComicByID,
  getComicsByNameFilter,
  getTrendiestComic,
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
  getPersonByID,
  getPeopleByNameFilter,
} from "../controllers/personController";
import {
  getRandomComic,
  getRandomComics,
} from "../controllers/comicController";
import { getRandomQuote } from "../controllers/quoteController";
import { getRandomImages } from "../controllers/comicController";

const router = express.Router();

router.get("/hero/:heroID", getHeroByID);
router.get("/hero/name/:heroName", getHeroesByNameFilter);
router.get("/hero-trendiest", getTrendiestHero);

router.get("/comic/:comicID", getComicByID);
router.get("/comic/name/:comicName", getComicsByNameFilter);
router.get("/comic-trendiest", getTrendiestComic);

router.get("/movie/:movieID", getMovieByID);
router.get("/movie/name/:movieName", getMoviesByNameFilter);

router.get("/person/:personID", getPersonByID);
router.get("/person/name/:personName", getPeopleByNameFilter);

router.get("/movierandom", getRandomMovie);
router.get("/moviesrandom", getRandomMovies);

router.get("/comicrandom", getRandomComic);
router.get("/comicsrandom", getRandomComics);
router.get("/randomcomicimages/:number", getRandomImages);

router.get("/quote", getRandomQuote);

module.exports = router;
