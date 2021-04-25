import axios from "axios";
import credentials from "../../api_credentials";

export const getMovieByID = async (req, res) => {
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
};

export const getMoviesByNameFilter = (req, res) => {
  const movieName = req.params.movieName;

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
  });
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomMovie = async (req, res) => {
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
};

export const getRandomMovies = async (req, res) => {};
