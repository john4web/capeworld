import axios from "axios";
import credentials from "../../api_credentials";
import crypto from "crypto";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  //ToDo: validate heroID

  //superhero api
  // try {
  //   const response = await axios.get(
  //     `https://superheroapi.com/api/${credentials.superhero_api.access_token}/${heroID}`
  //   );
  //   res.json(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  //comicvines api
  // try {
  //   const response = await axios.get(
  //     `https://comicvine.gamespot.com/api/character/${heroID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
  //   );
  //   res.json(response.data);
  // } catch (error) {
  //   console.error(error);
  // }
};

export const getHeroesByNameFilter = async (req, res) => {
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

  let promise1 = axios.get(marvel_api_request_url);
  let promise2 = axios.get(superheroes_api_request_url);
  let promise3 = axios.get(comicvines_api_request_url);

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      //executed when all APIs sent data back
      console.log("THEN");
      let a = results.map((apiResponse) => {
        return apiResponse.data.results || apiResponse.data.data.results || [];
      });
      console.log(a);
      res.json(a);
    })
    .catch((err) => {
      console.log("ERR");
      //executed when at least one of the promises throw an error
      console.log(err);
    })
    .finally(() => {
      console.log(promise1);
      console.log(promise2);
      console.log(promise3);
      console.log("FINALLY");
      //executed when the promises are resolved
    });
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
