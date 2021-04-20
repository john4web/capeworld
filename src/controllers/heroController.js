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

  // //marvel api
  // try {
  //   const requestURL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&orderBy=name&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  //   console.log(requestURL);
  //   const response = await axios.get(requestURL);
  //   res.json(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  // // superheroes api
  // try {
  //   const response = await axios.get(
  //     `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`
  //   );
  //   res.json(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  //comicvines api
  try {
    const response = await axios.get(
      `http://www.comicvine.com/api/search/?api_key=${credentials.comic_vines_api.access_token}&query=${heroName}&resources=character&format=json`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
