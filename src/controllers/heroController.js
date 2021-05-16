import axios from "axios";
import credentials from "../../api_credentials";
import crypto from "crypto";
//import NodeCache from "node-cache";
import { CharacterModel } from "../models/characterModel";

//const myCache = new NodeCache();
//const cacheTTL = 60; //60 Minuten

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  const doc = await CharacterModel.findOne({ id: heroID }, "name").exec();

  if (doc === null) {
    //requested hero is not persisted in database
    res.json([]); //send empty array
    return; //stop script execution
  } else {
    const heroName = doc.name;
    const timestamp = String(Date.now());
    const privateKey = credentials.marvel_api.private_key;
    const publicKey = credentials.marvel_api.public_key;
    const hash = crypto
      .createHash("md5")
      .update(timestamp + privateKey + publicKey)
      .digest("hex");

    const responseObject = {
      //From marvel API
      description_short: null,
      //From Superhero API
      powerstats: null,
      appearance: null,
      work: null,
      connections: null,
      biography: null,
      //From comicvine API
      id: null,
      name: null,
      aliases: null,
      birth: null,
      character_enemies: null,
      character_friends: null,
      count_of_issue_appearances: null,
      creators: null,
      deck: null,
      description: null,
      first_appeared_in_issue: null,
      gender: null,
      image: null,
      issue_credits: null,
      issues_died_in: null,
      movies: null,
      origin: null,
      powers: null,
      publisher: null,
      real_name: null,
      teams: null,
    };

    const marvel_api_request_url = `http://gateway.marvel.com/v1/public/characters?name=${heroName}&limit=1&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    const superheroes_api_request_url = `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`;
    const comicvines_api_request_url = `https://comicvine.gamespot.com/api/character/4005-${heroID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`;

    const promises = [
      axios.get(marvel_api_request_url),
      axios.get(superheroes_api_request_url),
      axios.get(comicvines_api_request_url),
    ];

    Promise.allSettled(promises).then((apiResponses) => {
      const a = apiResponses;
      const filteredResponse = apiResponses
        .filter((item) => item.status !== "rejected")
        .filter((item) => item.value.data.response !== "error");

      filteredResponse.forEach((item) => {
        switch (item.value.config.url) {
          case marvel_api_request_url:
            if (
              item.value.data.data.results[0] !== undefined &&
              item.value.data.data.results[0].description !== ""
            ) {
              responseObject.description_short =
                item.value.data.data.results[0].description;
            }
            break;

          case superheroes_api_request_url:
            const filteredHero = item.value.data.results.filter(
              (hero) => hero.name === heroName
            )[0];
            responseObject.powerstats = filteredHero.powerstats;
            responseObject.appearance = filteredHero.appearance;
            responseObject.work = filteredHero.work;
            responseObject.connections = filteredHero.connections;
            responseObject.biography = filteredHero.biography;
            break;

          case comicvines_api_request_url:
            const comicVinesAPIResponse = item.value.data.results;

            responseObject.id = heroID;
            responseObject.name = comicVinesAPIResponse.name || null;
            responseObject.aliases = comicVinesAPIResponse.aliases || null;
            responseObject.birth = comicVinesAPIResponse.birth || null;
            responseObject.deck = comicVinesAPIResponse.deck || null;
            responseObject.description =
              comicVinesAPIResponse.description || null;
            responseObject.origin = comicVinesAPIResponse.origin.name || null;
            responseObject.real_name = comicVinesAPIResponse.real_name || null;
            responseObject.publisher =
              comicVinesAPIResponse.publisher.name || null;
            responseObject.image =
              comicVinesAPIResponse.image.medium_url || null;
            responseObject.count_of_issue_appearances =
              comicVinesAPIResponse.count_of_issue_appearances || null;
            responseObject.first_appeared_in_issue =
              comicVinesAPIResponse.first_appeared_in_issue
                ? {
                    id: comicVinesAPIResponse.first_appeared_in_issue.id,
                    name: comicVinesAPIResponse.first_appeared_in_issue.name,
                  }
                : null;

            switch (comicVinesAPIResponse.gender) {
              case 0:
                responseObject.gender = "other";
                break;
              case 1:
                responseObject.gender = "male";
                break;
              case 2:
                responseObject.gender = "female";
                break;
              default:
                responseObject.gender = null;
            }

            // todo null überprüfung
            responseObject.character_enemies = comicVinesAPIResponse
              .character_enemies.length
              ? comicVinesAPIResponse.character_enemies.map((enemy) => {
                  return { id: enemy.id, name: enemy.name };
                })
              : null;

            responseObject.character_friends = comicVinesAPIResponse
              .character_friends.length
              ? comicVinesAPIResponse.character_friends.map((friend) => {
                  return { id: friend.id, name: friend.name };
                })
              : null;

            responseObject.creators = comicVinesAPIResponse.creators.length
              ? comicVinesAPIResponse.creators.map((creator) => {
                  return { id: creator.id, name: creator.name };
                })
              : null;

            responseObject.teams = comicVinesAPIResponse.teams.length
              ? comicVinesAPIResponse.teams.map((team) => team.name)
              : null;
            responseObject.powers = comicVinesAPIResponse.powers.length
              ? comicVinesAPIResponse.powers.map((power) => power.name)
              : null;

            responseObject.movies = comicVinesAPIResponse.movies.length
              ? comicVinesAPIResponse.movies.map((movie) => {
                  return { id: movie.id, name: movie.name };
                })
              : null;

            responseObject.issues_died_in = comicVinesAPIResponse.issues_died_in
              .length
              ? comicVinesAPIResponse.issues_died_in.map((issue) => {
                  return { id: issue.id, name: issue.name };
                })
              : null;

            responseObject.issue_credits = comicVinesAPIResponse.issue_credits
              .length
              ? comicVinesAPIResponse.issue_credits
                  .filter((issue) => issue.name) //only show issues with a name
                  .slice(0, 40) //only show first 40 issues
                  .map((issue) => {
                    return { id: issue.id, name: issue.name };
                  })
              : null;

            break;

          default:
            throw new Error("API request not defined");
        }
      });
      res.json(responseObject);
    });
  }

  /*let comicVinesAPIResponse = {};
  const responseObject = {};

  axios
    .get(comicvines_api_request_url)
    .then((response) => {
      comicVinesAPIResponse = response.data.results;

      delete comicVinesAPIResponse.api_detail_url;
      delete comicVinesAPIResponse.date_added;
      delete comicVinesAPIResponse.date_last_updated;
      delete comicVinesAPIResponse.site_detail_url;
      delete comicVinesAPIResponse.story_arc_credits;
      delete comicVinesAPIResponse.volume_credits;
      delete comicVinesAPIResponse.team_enemies;
      delete comicVinesAPIResponse.team_friends;
      delete comicVinesAPIResponse.first_appeared_in_issue.api_detail_url;
      comicVinesAPIResponse.origin = comicVinesAPIResponse.origin.name;
      delete comicVinesAPIResponse.publisher.api_detail_url;

      comicVinesAPIResponse.character_enemies.forEach((enemy) => {
        delete enemy.api_detail_url;
        delete enemy.site_detail_url;
      });

      comicVinesAPIResponse.character_friends.forEach((enemy) => {
        delete enemy.api_detail_url;
        delete enemy.site_detail_url;
      });
      comicVinesAPIResponse.creators.forEach((enemy) => {
        delete enemy.api_detail_url;
        delete enemy.site_detail_url;
      });

      const filteredIssues = comicVinesAPIResponse.issue_credits
        .filter((issue) => issue.name)
        .slice(0, 40);

      filteredIssues.forEach((issue) => {
        delete issue.api_detail_url;
        delete issue.site_detail_url;
      });

      comicVinesAPIResponse.issue_credits = filteredIssues;

      comicVinesAPIResponse.issues_died_in.forEach((enemy) => {
        delete enemy.api_detail_url;
        delete enemy.site_detail_url;
      });

      comicVinesAPIResponse.movies.forEach((enemy) => {
        delete enemy.api_detail_url;
        delete enemy.site_detail_url;
      });

      const filteredCreators = comicVinesAPIResponse.creators.map(
        (item) => item.name
      );
      comicVinesAPIResponse.creators = filteredCreators;

      const filteredPowers = comicVinesAPIResponse.powers.map(
        (item) => item.name
      );
      comicVinesAPIResponse.powers = filteredPowers;

      const filteredTeams = comicVinesAPIResponse.teams.map(
        (item) => item.name
      );
      comicVinesAPIResponse.teams = filteredTeams;

      comicVinesAPIResponse.image = comicVinesAPIResponse.image.medium_url;

      Object.assign(responseObject, comicVinesAPIResponse);

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
            if (
              item.value.data.data.results[0] !== undefined &&
              item.value.data.data.results[0].description !== ""
            ) {
              responseObject.description_short =
                item.value.data.data.results[0].description;
            }
          } else if (item.value.config.url === superheroes_api_request_url) {
            const filteredHero = item.value.data.results.filter(
              (hero) => hero.name === comicVinesAPIResponse.name
            )[0];

            responseObject.powerstats = filteredHero.powerstats;
            responseObject.appearance = filteredHero.appearance;
            responseObject.work = filteredHero.work;
            responseObject.connections = filteredHero.connections;
            responseObject.biography = filteredHero.biography;
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
    });*/
};

export const getHeroesByNameFilter = (req, res) => {
  const heroName = req.params.heroName;

  // SQL Injection possible??
  const regex = new RegExp(heroName, "i"); //selects all the heroes that have the substring the user typed in

  CharacterModel.find({ name: { $regex: regex } }, "id name", (err, docs) => {
    const response = docs.map((item) => {
      return { id: item.id, name: item.name };
    });
    res.json(response);
  });

  /*
  if (cachedHeroesList) {
    //This is executed when the cache is available

    //filter out heroes that include not the name the user typed in.
    const cachedResponse = cachedHeroesList.data.filter((character) =>
      character.name.toLowerCase().includes(heroName.toLowerCase())
    );

    res.json(cachedResponse);
    myCache.ttl("HeroesList", cacheTTL); //renew cache TTL
  } else {
    //This is executed when no cache is available

    //get data from APIs
    const comicvines_MARVEL_request_url = `https://comicvine.gamespot.com/api/publisher/31/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;
    const comicvines_DC_request_url = `https://comicvine.gamespot.com/api/publisher/10/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;

    //fetch 39.181 characters from DC and Marvel
    const promises = [
      axios.get(comicvines_DC_request_url),
      axios.get(comicvines_MARVEL_request_url),
    ];

    Promise.allSettled(promises) //returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
      .then((apiResponses) => {
        //gets executed when all promises have either fulfilled or rejected

        const responseArray = apiResponses
          .filter((apiResponse) => apiResponse.status !== "rejected") //filter out rejected responses
          .map((apiResponse) => apiResponse.value.data.results.characters); //show only the characters

        const generatedResponse = [...responseArray[0], ...responseArray[1]] //create one Array with all characters in it
          .map((character) => {
            return { id: character.id, name: character.name }; //show only id and name of characters
          });

        myCache.set("HeroesList", { data: generatedResponse }, cacheTTL);

        const generatedFilteredResponse = generatedResponse.filter(
          //filter out heroes that include not the name the user typed in.
          (character) =>
            character.name.toLowerCase().includes(heroName.toLowerCase())
        );

        res.json(generatedFilteredResponse);
      });
  }*/
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};

//Function to insert all DC and Marvel Characters from the ComicVine-API in our database
const insertAllCharactersInDatabase = (res) => {
  //get data from APIs
  const comicvines_MARVEL_request_url = `https://comicvine.gamespot.com/api/publisher/31/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;
  const comicvines_DC_request_url = `https://comicvine.gamespot.com/api/publisher/10/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;

  //fetch 39.208 characters from DC and Marvel
  const promises = [
    axios.get(comicvines_DC_request_url),
    axios.get(comicvines_MARVEL_request_url),
  ];

  Promise.allSettled(promises) //returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
    .then((apiResponses) => {
      //gets executed when all promises have either fulfilled or rejected

      const responseArray = apiResponses
        .filter((apiResponse) => apiResponse.status !== "rejected") //filter out rejected responses
        .map((apiResponse) => apiResponse.value.data.results.characters); //show only the characters

      const generatedResponse = [...responseArray[0], ...responseArray[1]] //create one Array with all characters in it
        .map((character) => {
          return { id: character.id, name: character.name }; //show only id and name of characters
        });

      // Insert
      CharacterModel.insertMany(generatedResponse)
        .then(function () {
          console.log("Data Successfully Inserted"); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    });
};
