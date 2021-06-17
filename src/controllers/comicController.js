import axios from "axios";
import credentials from "../../api_credentials";
import { ComicModel } from "../models/comicModel";
import { PersonModel } from "../models/personModel";

export const getComicByID = async (req, res) => {
  const comicID = req.params.comicID;

  try {
    const request = await axios.get(
      `https://comicvine.gamespot.com/api/issue/4000-${comicID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );

    const response = request.data.results;

    const responseObject = {
      id: null,
      name: null,
      image: null,
      issue_number: null,
      store_date: null,
      volume_name: null,
      cover_date: null,
      description: null,
      deck: null,
      character_died_in: null,
      character_credits: null,
      person_credits: null,
      team_credits: null,
      aliases: null,
      first_appearance_characters: null,
      first_appearance_teams: null,
    };

    responseObject.id = response.id;
    responseObject.name = response.name || "issue name unknown";
    responseObject.image = response.image.medium_url;
    responseObject.issue_number = response.issue_number;
    responseObject.store_date = response.store_date;
    responseObject.volume_name = response.volume.name;
    responseObject.cover_date = response.cover_date;
    responseObject.description = response.description;
    responseObject.deck = response.deck;

    responseObject.character_died_in =
      response.character_died_in.map((character) => {
        return { id: character.id, name: character.name };
      }) || null;

    if (!responseObject.character_died_in.length) {
      responseObject.character_died_in = null;
    }

    responseObject.character_credits =
      response.character_credits.map((character) => {
        return { id: character.id, name: character.name };
      }) || null;

    responseObject.person_credits =
      response.person_credits.map((person) => {
        return { id: person.id, name: person.name, role: person.role };
      }) || null;

    responseObject.team_credits =
      response.team_credits.map((team) => team.name) || null;

    if (!responseObject.team_credits.length) {
      responseObject.team_credits = null;
    }

    responseObject.aliases = response.aliases;

    responseObject.first_appearance_characters =
      response.first_appearance_characters;
    responseObject.first_appearance_teams = response.first_appearance_teams;

    //Save comic into database when it does not exist in the database
    ComicModel.findOne({ id: responseObject.id }, (err, comic) => {
      if (!comic) {
        ComicModel.create({
          id: responseObject.id,
          name: responseObject.name,
          image: responseObject.image,
          accesscount: 1,
        });
      } else {
        comic.accesscount++;
        comic.image = responseObject.image;
        comic.save();
      }
    });

    res.json(responseObject);

    //Save every person who worked on the comic into the database. But only if it does not already exist in the database
    const personCredits = responseObject.person_credits || [];
    personCredits.forEach((item) => {
      PersonModel.findOne({ id: item.id }, "", (err, docs) => {
        if (!docs) {
          PersonModel.create(
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
  } catch (error) {
    console.error(error);
  }
};

export const getComicsByNameFilter = (req, res) => {
  const comicName = req.params.comicName;

  const regex = new RegExp(comicName, "i"); //selects all the heroes that have the substring the user typed in

  ComicModel.find({ name: { $regex: regex } }, "id name image", (err, docs) => {
    const response = docs.map((item) => {
      return { id: item.id, name: item.name, image: item.image };
    });
    res.json(response);
  });

  /* const comicName = req.params.comicName;

  const comicvines_api_request_url = `https://comicvine.gamespot.com/api/issues/?api_key=${credentials.comic_vines_api.access_token}&filter=name:${comicName}&field_list=id,name,image,api_detail_url&format=json`;

  const promises = [axios.get(comicvines_api_request_url)];

  Promise.allSettled(promises).then((apiResponses) => {
    const filteredResponse = apiResponses
      .map((apiResponse) => apiResponse.value)
      .filter((item) => item !== undefined)
      .filter((item) => item.data.response !== "error");

    const responseArray = [];

    filteredResponse.forEach((item) => {
      item.data.results.forEach((comic) => {
        responseArray.push({
          id: comic.id,
          name: comic.name,
          imageURL: comic.image.thumb_url,
        });
      });
    });

    res.json(responseArray);
  });
  */
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomComic = async (req, res) => {
  //TODO test if id is valid
  /* const comicID = Math.floor(Math.random() * 18000) + 1;

  try {
    const response = await axios.get(
      `https://comicvine.gamespot.com/api/issue/4000-${comicID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );
    const responseArray = [];

    responseArray.push({
      id: response.data.results.id,
      name: response.data.results.name,
      imageURL: response.data.results.image
        ? response.data.results.image.icon_url
        : null,
    });

    res.json(responseArray);
  } catch (error) {
    console.error(error);
  }*/

  res.json(await ComicModel.getRandomComic());
  /*
  ComicModel.getRandomComic((err, comic) => {
    res.json(comic);
  });*/
};

export const getRandomComics = (req, res) => {};

export const getTrendiestComic = (req, res) => {
  ComicModel.findTrendiest((err, comic) => {
    res.json(comic);
  });
};

export const getRandomImages = async (req, res) => {
  // returns random comic cover images
  const imageCount = req.params.number;
  const imageArray = [];
  const count = await ComicModel.estimatedDocumentCount();
  for (let i = 0; i < imageCount; i++) {
    const random = Math.floor(Math.random() * count);
    const comic = await ComicModel.findOne().skip(random).exec();
    if (comic.image !== null) {
      imageArray.push(comic.image);
    } else {
      i--;
    }
  }
  res.json(imageArray);
};
