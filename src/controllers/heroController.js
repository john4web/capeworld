import axios from "axios";
import credentials from "../../api_credentials";
import crypto from "crypto";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  console.log(req.params.heroID);
  //ToDo: validate heroID

  //superhero api
  try {
    const response = await axios.get(
      `https://superheroapi.com/api/${credentials.superhero_api.access_token}/${heroID}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }

  //comicvines api
  try {
    const response = await axios.get(
      `https://comicvine.gamespot.com/api/character/${heroID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getHeroesByNameFilter = (req, res) => {
  //requests all 3 Apis and searches for the heroName

  const heroName = req.params.heroName;
  const timestamp = String(Date.now());
  const privateKey = credentials.marvel_api.private_key;
  const publicKey = credentials.marvel_api.public_key;
  const hash = crypto
    .createHash("md5")
    .update(timestamp + privateKey + publicKey)
    .digest("hex");

  const marvel_api_request_url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&orderBy=name&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  const superheroes_api_request_url = `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`;
  const comicvines_api_request_url = `http://www.comicvine.com/api/search/?api_key=${credentials.comic_vines_api.access_token}&query=${heroName}&resources=character&format=json`;

  const promises = [
    axios.get(marvel_api_request_url),
    axios.get(superheroes_api_request_url),
    axios.get(comicvines_api_request_url),
  ];

  Promise.allSettled(promises) //returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
    .then((apiResponses) => {
      //gets executed when all promises have either fulfilled or rejected

      const filteredResponse = apiResponses
        .map((apiResponse) => apiResponse.value)
        .filter((item) => item !== undefined)
        .filter((item) => item.data.response !== "error");

      const responseObject = {};

      filteredResponse.forEach((item) => {
        switch (item.config.url) {
          case marvel_api_request_url:
            Object.defineProperty(responseObject, "Marvel-API", {
              value: item.data.data.results,
              enumerable: true,
            });
            break;
          case superheroes_api_request_url:
            Object.defineProperty(responseObject, "SuperheroesAPI", {
              value: item.data.results,
              enumerable: true,
            });
            break;
          case comicvines_api_request_url:
            Object.defineProperty(responseObject, "Comicvine-API", {
              value: item.data.results,
              enumerable: true,
            });
            break;
          default:
            throw new Error("API request not defined");
        }
      });

      res.json(responseObject);
    });
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
