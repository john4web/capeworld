import axios from "axios";
import credentials from "../../api_credentials";
//import crypto from "crypto";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  //ToDo: validate heroID
  //http://gateway.marvel.com/v1/public/characters/${characterID}?apikey=${publicKey}&limit=100&ts=${timestamp}&hash=${hash}`;
  //https://superheroapi.com/api/${access-token}/${characterID}
  //https://comicvine.gamespot.com/api/character/4005-${characterID}/?api_key=${access-token}&format=json
};

export const getHeroesByNameFilter = (req, res) => {
  //requests all 3 Apis and searches for the heroName

  const heroName = req.params.heroName;
  // const timestamp = String(Date.now());
  // const privateKey = credentials.marvel_api.private_key;
  // const publicKey = credentials.marvel_api.public_key;
  // const hash = crypto
  //   .createHash("md5")
  //   .update(timestamp + privateKey + publicKey)
  //   .digest("hex");

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
