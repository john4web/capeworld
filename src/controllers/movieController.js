import axios from "axios";
import credentials from "../../api_credentials";
import { MovieModel } from "../models/movieModel";

/*export const getMovieByID = async (req, res) => {
  var movieID = req.params.movieID;

  try {
    const response = await axios.get(
      `https://comicvine.gamespot.com/api/movie/4025-${movieID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );
    const responseArray = [];

    responseArray.push({
      id: response.data.results.id,
      name: response.data.results.name,
      imageURL: response.data.results.image.medium_url,
      rating: response.data.results.rating,
      releaseDate: response.data.results.release_date,
      runtime: response.data.results.runtime,
      studios: response.data.results.studios,
      writers: response.data.results.writers,
      story: response.data.results.description,
    });

    res.json(responseArray);
  } catch (error) {
    console.error(error);
  }
};*/

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
      ? response.writers.map((writer) => writer.name)
      : null;

    responseObject.characters = response.characters
      ? response.characters.map((character) => {
          return { id: character.id, name: character.name };
        })
      : null;

    responseObject.producers = response.producers
      ? response.producers.map((producer) => producer.name)
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
        movie.save();
      }
    });

    res.json(responseObject);
  } catch (error) {
    console.error(error);
  }
};

export const getMoviesByNameFilter = (req, res) => {
  /* const movieName = req.params.movieName;

  const comicvines_api_request_url = `https://comicvine.gamespot.com/api/movies/?api_key=${credentials.comic_vines_api.access_token}&filter=name:${movieName}&field_list=id,name,image,api_detail_url&format=json`;
  const promises = [axios.get(comicvines_api_request_url)];

  Promise.allSettled(promises).then((apiResponses) => {
    const filteredResponse = apiResponses
      .map((apiResponse) => apiResponse.value)
      .filter((item) => item !== undefined)
      .filter((item) => item.data.response !== "error");

    const responseArray = [];

    filteredResponse.forEach((item) => {
      item.data.results.forEach((movie) => {
        responseArray.push({
          id: movie.id,
          name: movie.name,
          imageURL: movie.image.thumb_url,
        });
      });
    });

    res.json(responseArray);
  });*/
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend

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
  /*
  //TODO test if id is valid
  var movieID = Math.floor(Math.random() * 1999) + 1;

  try {
    const response = await axios.get(
      `https://comicvine.gamespot.com/api/movie/4025-${movieID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );
    const responseArray = [];

    responseArray.push({
      id: response.data.results.id,
      name: response.data.results.name,
      imageURL: response.data.results.image.icon_url,
    });

    res.json(responseArray);
  } catch (error) {
    console.error(error);
  }
  */

  MovieModel.getRandomMovie((err, movie) => {
    res.json(movie);
  });
};

export const getRandomMovies = async (req, res) => {};
