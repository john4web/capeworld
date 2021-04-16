import axios from "axios";
import credentials from "../../api_credentials";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  //ToDo: validate heroID

  try {
    const response = await axios.get(
      `https://superheroapi.com/api/${credentials.superhero_api.access_token}/${heroID}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getHeroesByNameFilter = (req, res) => {};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
