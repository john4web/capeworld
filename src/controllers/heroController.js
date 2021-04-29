import axios from "axios";
import credentials from "../../api_credentials";
import crypto from "crypto";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  const timestamp = String(Date.now());
  const privateKey = credentials.marvel_api.private_key;
  const publicKey = credentials.marvel_api.public_key;
  const hash = crypto
    .createHash("md5")
    .update(timestamp + privateKey + publicKey)
    .digest("hex");

  const comicvines_api_request_url = `https://comicvine.gamespot.com/api/character/4005-${heroID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`;
  let comicVinesAPIResponse = {};
  const responseObject = {};

  axios
    .get(comicvines_api_request_url)
    .then((response) => {
      comicVinesAPIResponse = response.data.results;

      Object.defineProperty(responseObject, "comicvine_api", {
        enumerable: true,
        value: comicVinesAPIResponse,
      });

      const marvel_api_request_url = `http://gateway.marvel.com/v1/public/characters?name=${comicVinesAPIResponse.name}&limit=1&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
      const superheroes_api_request_url = `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${comicVinesAPIResponse.name}`;

      const promises = [
        axios.get(marvel_api_request_url),
        axios.get(superheroes_api_request_url),
      ];

      Promise.allSettled(promises).then((apiResponses) => {
        const filteredResponse = apiResponses
          .filter((item) => item.status !== "rejected")
          .filter((item) => item.value.data.response !== "error");

        filteredResponse.forEach((item) => {
          if (item.value.config.url === marvel_api_request_url) {
            if (item.value.data.data.results[0] !== undefined) {
              Object.defineProperty(responseObject, "marvel_api", {
                enumerable: true,
                value: item.value.data.data.results[0],
              });
            }
          } else if (item.value.config.url === superheroes_api_request_url) {
            const filteredHero = item.value.data.results.filter(
              (hero) => hero.name === comicVinesAPIResponse.name
            )[0];
            Object.defineProperty(responseObject, "superhero_api", {
              enumerable: true,
              value: filteredHero,
            });
          } else {
            throw new Error("API request not defined");
          }
        });
        res.json(responseObject);
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

export const getHeroesByNameFilter = (req, res) => {
  const heroName = req.params.heroName;

  //const marvel_api_request_url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&orderBy=name&limit=100&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  // Return characters with names that begin with the specified string (e.g. Sp) for Spider-Man.
  // order by name ascending
  // limit 100: returns not more than 100 items, max: 100

  // const superheroes_api_request_url = `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`;
  //gibt unendlich viele zurück
  //const comicvines_api_request_url = `http://www.comicvine.com/api/search/?api_key=${credentials.comic_vines_api.access_token}&query=${heroName}&resources=character&format=json`;
  // const comicvines_api_request_url = `https://comicvine.gamespot.com/api/characters/?api_key=${credentials.comic_vines_api.access_token}&filter=name:${heroName}&field_list=id,name,image,api_detail_url&format=json`;

  const comicvines_MARVEL_request_url = `https://comicvine.gamespot.com/api/publisher/31/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;
  const comicvines_DC_request_url = `https://comicvine.gamespot.com/api/publisher/10/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;
  // max 100 results
  //&field_list=id,name,image,api_detail_url   ---> works!
  //&limit=100
  //&sort=name:asc
  //&filter=name:spider

  const promises = [
    // axios.get(marvel_api_request_url),
    // axios.get(superheroes_api_request_url),
    axios.get(comicvines_DC_request_url),
    axios.get(comicvines_MARVEL_request_url),
  ];

  //liefern 39.181 Characters von DC und Marvel zurück

  Promise.allSettled(promises) //returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
    .then((apiResponses) => {
      //gets executed when all promises have either fulfilled or rejected

      const responseArray = apiResponses
        .filter((apiResponse) => apiResponse.status !== "rejected") //filter out rejected responses
        .map((apiResponse) => apiResponse.value.data.results.characters); //show only the characters

      const generatedResponse = [...responseArray[0], ...responseArray[1]] //create one Array with all characters in it
        .map((character) => {
          return { id: character.id, name: character.name }; //show only id and name of characters
        })
        //ToDo: Die API-Calls hier sofort cachen!!!!
        .filter(
          (character) =>
            character.name.toLowerCase().includes(heroName.toLowerCase()) //filter out heroes that include not the name the user typed in.
        );

      res.json(generatedResponse);
    });
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};
