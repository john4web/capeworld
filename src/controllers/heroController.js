import axios from "axios";
import credentials from "../../api_credentials";
import crypto from "crypto";
import { CharacterModel } from "../models/characterModel";
import { ComicModel } from "../models/comicModel";
import { MovieModel } from "../models/movieModel";

export const getHeroByID = async (req, res) => {
  const heroID = req.params.heroID;
  let doc = null;
  try {
    doc = await CharacterModel.findOne({ id: heroID }, "name").exec();
  } catch (error) {
    res.json({ notFound: true });
    return; //stop script execution
  }

  if (doc === null) {
    //requested hero is not persisted in database
    res.json({ notFound: true });
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

    const isMostFamousHero = await CharacterModel.isMostFamousHero(
      heroID,
      heroName
    );

    const comicvines_api_request_url = `https://comicvine.gamespot.com/api/character/4005-${heroID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`;
    let marvel_api_request_url = "";
    let superheroes_api_request_url = "";

    if (isMostFamousHero) {
      marvel_api_request_url = `http://gateway.marvel.com/v1/public/characters?name=${heroName}&limit=1&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
      superheroes_api_request_url = `https://superheroapi.com/api/${credentials.superhero_api.access_token}/search/${heroName}`;
    }

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
            const filteredHero =
              item.value.data.results.filter(
                (hero) => hero.name === heroName
              )[0] || null;
            responseObject.powerstats = filteredHero
              ? filteredHero.powerstats
              : null;

            responseObject.appearance = filteredHero
              ? replaceDashInObjectKeys(filteredHero.appearance)
              : null;

            responseObject.work = filteredHero ? filteredHero.work : null;

            responseObject.connections = filteredHero
              ? replaceDashInObjectKeys(filteredHero.connections)
              : null;

            responseObject.biography = filteredHero
              ? replaceDashInObjectKeys(filteredHero.biography)
              : null;
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
                    name:
                      comicVinesAPIResponse.first_appeared_in_issue.name ||
                      "issue name unknown",
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

            /*
            responseObject.movies = comicVinesAPIResponse.movies.length
              ? comicVinesAPIResponse.movies
                  .filter((movie) => movie.name) //only show movies with a name
                  .slice(0, 40) //only show first 40 moovies
                  .map((movie) => {
                    return { id: movie.id, name: movie.name };
                  })
              : null;*/

            if (comicVinesAPIResponse.movies.length) {
              const filteredMovies = comicVinesAPIResponse.movies.filter(
                (movie) => movie.name
              ); //only show movies with a name
              const randomMovies = getRandomElementsOfArray(filteredMovies, 40); //show 40 random movies
              responseObject.movies = randomMovies.map((movie) => {
                return { id: movie.id, name: movie.name };
              });
            } else {
              responseObject.movies = null;
            }

            responseObject.issues_died_in = comicVinesAPIResponse.issues_died_in
              .length
              ? comicVinesAPIResponse.issues_died_in.map((issue) => {
                  return {
                    id: issue.id,
                    name: issue.name || "issue name unknown",
                  };
                })
              : null;

            if (comicVinesAPIResponse.issue_credits.length) {
              const filteredIssues = comicVinesAPIResponse.issue_credits.filter(
                (issue) => issue.name
              ); //only show issues with a name
              const randomIssues = getRandomElementsOfArray(filteredIssues, 40); //show 40 random issues
              responseObject.issue_credits = randomIssues.map((issue) => {
                return { id: issue.id, name: issue.name };
              });
            } else {
              responseObject.issue_credits = null;
            }
            /*
            responseObject.issue_credits = comicVinesAPIResponse.issue_credits
              .length
              ? comicVinesAPIResponse.issue_credits
                  .filter((issue) => issue.name) //only show issues with a name
                  .slice(0, 40) //only show first 40 issues
                  .map((issue) => {
                    return { id: issue.id, name: issue.name };
                  })
              : null;*/

            break;

          default:
            throw new Error("API request not defined");
        }
      });

      CharacterModel.findOne(
        { id: responseObject.id },
        "id image accesscount issue_appearance_count",
        (err, docs) => {
          if (!Boolean(docs.image)) {
            docs.image = responseObject.image;
          }
          docs.accesscount++;
          docs.issue_appearance_count =
            responseObject.count_of_issue_appearances;
          docs.save();
          res.json(responseObject);
        }
      );

      //Save all comics of the current hero in the database, but only if they do not exist in the databse
      const issueCredits = responseObject.issue_credits || [];
      issueCredits.forEach((item) => {
        ComicModel.findOne({ id: item.id }, "", (err, docs) => {
          if (!docs) {
            ComicModel.create(
              { id: item.id, name: item.name, image: null, accesscount: 0 },
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        });
      });

      //Save all movies of the current hero in the database, but only if they do not exist in the databse
      const moviesToSave = responseObject.movies || [];
      moviesToSave.forEach((item) => {
        MovieModel.findOne({ id: item.id }, "", (err, docs) => {
          if (!docs) {
            MovieModel.create(
              { id: item.id, name: item.name, image: null, accesscount: 0 },
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        });
      });
    });
  }

  const replaceDashInObjectKeys = (object) => {
    const keys = Object.keys(object);
    keys.forEach((key) => {
      const keyAfter = key.replace(/-/g, "_");
      if (key.includes("-")) {
        object[keyAfter] = object[key];
        delete object[key];
      }
    });
    return object;
  };

  function getRandomElementsOfArray(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len) return arr;
    //throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
};

export const getHeroesByNameFilter = (req, res) => {
  const heroName = req.params.heroName;

  const regex = new RegExp(heroName, "i"); //selects all the heroes that have the substring the user typed in

  CharacterModel.find(
    { name: { $regex: regex } },
    "id name image",
    (err, docs) => {
      const response = docs.map((item) => {
        return { id: item.id, name: item.name, image: item.image };
      });
      res.json(response);
    }
  );
};

export const getRandomHero = (req, res) => {};

export const getRandomHeroes = (req, res) => {};

export const getTrendiestHero = (req, res) => {
  CharacterModel.findTrendiest((err, character) => {
    res.json(character);
  });
};

export const getFirstThreeTrendiestHeroes = (req, res) => {};

//Function to insert all DC and Marvel Characters from the ComicVine-API in our database
export const insertNewCharactersInDatabase = () => {
  //get data from APIs
  const comicvines_MARVEL_request_url = `https://comicvine.gamespot.com/api/publisher/31/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;
  const comicvines_DC_request_url = `https://comicvine.gamespot.com/api/publisher/10/?api_key=${credentials.comic_vines_api.access_token}&field_list=characters&format=json`;

  //fetch 39.208 characters from DC and Marvel
  const promises = [
    axios.get(comicvines_DC_request_url),
    axios.get(comicvines_MARVEL_request_url),
  ];

  Promise.allSettled(promises) //returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
    .then(async (apiResponses) => {
      //gets executed when all promises have either fulfilled or rejected

      const responseArray = apiResponses
        .filter((apiResponse) => apiResponse.status !== "rejected") //filter out rejected responses
        .map((apiResponse) => apiResponse.value.data.results.characters); //show only the characters

      const generatedResponse = [...responseArray[0], ...responseArray[1]] //create one Array with all characters in it
        .map((character) => {
          return {
            id: character.id,
            name: character.name,
            image: null,
            accesscount: 0,
          }; //show only id, name and image of characters
        });

      const allHeroesFromDB = await CharacterModel.find({});
      const apiHeroIDs = generatedResponse.map((hero) => hero.id);
      const dbHeroIDs = allHeroesFromDB.map((hero) => hero.id);
      const differenceIDs = apiHeroIDs.filter((x) => !dbHeroIDs.includes(x));

      const difference = generatedResponse.filter((apiObj) => {
        return differenceIDs.some((id) => id === apiObj.id);
      });

      // Insert the new characters into the database
      CharacterModel.insertMany(difference)
        .then(function () {
          console.log("Data Successfully Inserted"); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    });
};
