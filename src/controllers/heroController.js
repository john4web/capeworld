import axios from "axios";
import credentials from "../../api_credentials";
import crypto from "crypto";

export const getHeroByID = async (req, res) => {
  var heroID = req.params.heroID;
  var id = heroID.charAt(0);
  const finalHeroID = heroID.slice(3);
  const timestamp = String(Date.now());
  const privateKey = credentials.marvel_api.private_key;
  const publicKey = credentials.marvel_api.public_key;
  const hash = crypto
    .createHash("md5")
    .update(timestamp + privateKey + publicKey)
    .digest("hex");

  if (id == 0) {
    //marvel api
    try {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/${finalHeroID}?apikey=${publicKey}&limit=100&ts=${timestamp}&hash=${hash}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  } else {
    //superhero api
    try {
      const response = await axios.get(
        `https://superheroapi.com/api/${credentials.superhero_api.access_token}/${finalHeroID}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //http://gateway.marvel.com/v1/public/characters/${characterID}?apikey=${publicKey}&limit=100&ts=${timestamp}&hash=${hash}`;
  //https://superheroapi.com/api/${access-token}/${characterID}
  //https://comicvine.gamespot.com/api/character/4005-${characterID}/?api_key=${access-token}&format=json
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

  const marvel_api_request_url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&orderBy=name&limit=100&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  // Return characters with names that begin with the specified string (e.g. Sp) for Spider-Man.
  // order by name ascending
  // limit 100: returns not more than 100 items, max: 100

  const superheroes_api_request_url = `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`;
  //gibt unendlich viele zurück
  //const comicvines_api_request_url = `http://www.comicvine.com/api/search/?api_key=${credentials.comic_vines_api.access_token}&query=${heroName}&resources=character&format=json`;
  const comicvines_api_request_url = `https://comicvine.gamespot.com/api/characters/?api_key=${credentials.comic_vines_api.access_token}&filter=name:${heroName}&field_list=id,name,image,api_detail_url&format=json`;
  // max 100 results
  //&field_list=id,name,image,api_detail_url   ---> works!
  //&limit=100
  //&sort=name:asc
  //&filter=name:spider

  const promises = [
    axios.get(marvel_api_request_url),
    axios.get(superheroes_api_request_url),
    //axios.get(comicvines_api_request_url),
  ];

  Promise.allSettled(promises) //returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
    .then((apiResponses) => {
      //gets executed when all promises have either fulfilled or rejected

      const filteredResponse = apiResponses
        .map((apiResponse) => apiResponse.value)
        .filter((item) => item !== undefined)
        .filter((item) => item.data.response !== "error");

      const responseArray = [];
      var testDuplicateArray = [];

      filteredResponse.forEach((item) => {
        switch (item.config.url) {
          case marvel_api_request_url:
            item.data.data.results.forEach((character) => {
              //IDs from Marvel-API start with 0--
              responseArray.push({
                id: `0--${character.id}`,
                name: character.name,
                imageURL: `${character.thumbnail.path}.${character.thumbnail.extension}`,
              });
              testDuplicateArray.push(character.name);
            });
            break;
          case superheroes_api_request_url:
            item.data.results.forEach((character) => {
              //IDs from Superhero-API start with 1--
              //if character already exists in the Marvel API, it will be delted from the Superhero-API results to avoid duplicates
              if (testDuplicateArray.includes(character.name)) {
                console.log("deleted");
              } else {
                responseArray.push({
                  id: `1--${character.id}`,
                  name: character.name,
                  imageURL: character.image.url,
                });
              }
            });
            break;
          // case comicvines_api_request_url:
          //   item.data.results.forEach((character) => {
          //     //IDs from Comicvine-API start with 2--
          //     responseArray.push({
          //       id: `2--${character.id}`,
          //       name: character.name,
          //       imageURL: character.image.thumb_url,
          //       //bigger images are also available
          //     });
          //   });
          // break;
          default:
            throw new Error("API request not defined");
        }
      });

      res.json(responseArray);
    });
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
