import axios from "axios";
import { CharacterModel } from "../models/characterModel";

export const getRandomQuote = async (req, res) => {
  try {
    let response;
    let hero;
    while (!hero) {
      response = await axios.get(
        `https://superhero-quotes.herokuapp.com/random`
      );

      hero = await CharacterModel.findMostFamousByName(
        response.data.Stuff.data.author
      );
    }

    res.json({
      author: hero,
      quote: response.data.Stuff.data.quote,
    });
  } catch (error) {
    console.error(error);
  }
};
