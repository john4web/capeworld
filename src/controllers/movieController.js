import axios from "axios";
import credentials from "../../api_credentials";
import { MovieModel } from "../models/movieModel";
import { PersonModel } from "../models/personModel";

export const getMovieByID = async (req, res) => {
  const movieID = req.params.movieID;

  try {
    const request = await axios.get(
      `https://comicvine.gamespot.com/api/movie/4025-${movieID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );

    const response = request.data.results;

    const responseObject = {
      id: null,
      name: null,
      image: null,
      budget: null,
      deck: null,
      description: null,
      rating: null,
      release_date: null,
      runtime: null,
      total_revenue: null,
      box_office_revenue: null,
      writers: null,
      characters: null,
      producers: null,
      studios: null,
    };

    responseObject.id = response.id;
    responseObject.name = response.name || "movie name unknown";
    responseObject.image = response.image.medium_url;
    responseObject.budget = response.budget;
    responseObject.deck = response.deck;
    responseObject.description = response.description;
    responseObject.rating = response.rating;
    responseObject.release_date = response.release_date;
    responseObject.total_revenue = response.total_revenue;
    responseObject.runtime = response.runtime;
    responseObject.box_office_revenue = response.box_office_revenue;

    responseObject.writers = response.writers
      ? response.writers.map((writer) => {
          return { id: writer.id, name: writer.name };
        })
      : null;

    responseObject.characters = response.characters
      ? response.characters.map((character) => {
          return { id: character.id, name: character.name };
        })
      : null;

    responseObject.producers = response.producers
      ? response.producers.map((producer) => {
          return { id: producer.id, name: producer.name };
        })
      : null;

    responseObject.studios = response.studios
      ? response.studios.map((studio) => studio.name)
      : null;

    //Save movie into database when it does not exist in the database
    MovieModel.findOne({ id: responseObject.id }, (err, movie) => {
      if (!movie) {
        MovieModel.create({
          id: responseObject.id,
          name: responseObject.name,
          image: responseObject.image,
          accesscount: 1,
        });
      } else {
        movie.accesscount++;
        movie.image = responseObject.image;
        movie.save();
      }
    });

    res.json(responseObject);

    const writersAndProducers =
      [
        ...(responseObject.writers || []),
        ...(responseObject.producers || []),
      ] || [];

    //Save every producer and writer of the movie into the database. But only if it does not already exist in the database
    writersAndProducers.forEach((item) => {
      PersonModel.findOne({ id: item.id }, "", (err, docs) => {
        if (!docs) {
          PersonModel.create(
            { id: item.id, name: item.name, image: null, accesscount: 0 },
            (err) => {
              console.log("inserted");
              if (err) {
                console.log(err);
              }
            }
          );
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMoviesByNameFilter = (req, res) => {
  const movieName = req.params.movieName;

  const regex = new RegExp(movieName, "i"); //selects all the heroes that have the substring the user typed in

  MovieModel.find({ name: { $regex: regex } }, "id name image", (err, docs) => {
    const response = docs.map((item) => {
      return { id: item.id, name: item.name, image: item.image };
    });
    res.json(response);
  });
};

export const getRandomMovie = async (req, res) => {
  // MovieModel.getRandomMovie((err, movie) => {
  res.json(await MovieModel.getRandomMovie());
  // });
};

export const getRandomMovies = async (req, res) => {};
