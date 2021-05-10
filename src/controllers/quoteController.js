import axios from "axios";

export const getRandomQuote = async (req, res) => {
  try {
    const response = await axios.get(
      `https://superhero-quotes.herokuapp.com/random`
    );
    const responseArray = [];

    responseArray.push({
      author: response.data.Stuff.data.author,
      quote: response.data.Stuff.data.quote,
    });

    res.json(responseArray);
  } catch (error) {
    console.error(error);
  }
};
