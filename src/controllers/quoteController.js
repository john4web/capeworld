import axios from "axios";

export const getRandomQuote = async (req, res) => {
  try {
    const response = await axios.get(
      `https://superhero-quotes.herokuapp.com/random`
    );

    res.json({
      author: response.data.Stuff.data.author,
      quote: response.data.Stuff.data.quote,
    });
  } catch (error) {
    console.error(error);
  }
};
