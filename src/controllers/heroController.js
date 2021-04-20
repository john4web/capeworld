import axios from "axios";
import credentials from "../../api_credentials";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
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
  // try {
  //   const response = await axios.get(
  //     `https://comicvine.gamespot.com/api/character/${heroID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
  //   );
  //   res.json(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  //marvel api
  //   try {
  //     const response = await axios.get(
  //       `https://superheroapi.com/api/${credentials.superhero_api.access_token}/${heroID}`
  //     );
  //     res.json(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
};

export const getHeroesByNameFilter = async (req, res) => {
  const heroName = req.params.heroName;

  try {
    const response = await axios.get(
      `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
