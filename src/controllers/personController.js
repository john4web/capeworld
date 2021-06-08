import axios from "axios";
import credentials from "../../api_credentials";
import { PersonModel } from "../models/personModel";
import { ComicModel } from "../models/comicModel";

export const getPersonByID = async (req, res) => {
  const personID = req.params.personID;

  try {
    const request = await axios.get(
      `https://comicvine.gamespot.com/api/person/4040-${personID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );

    const response = request.data.results;

    const responseObject = {
      id: null,
      name: null,
      image: null,
      website: null,
      birth: null,
      hometown: null,
      count_of_issue_appearances: null,
      country: null,
      death: null,
      deck: null,
      description: null,
      aliases: null,
      created_characters: null,
      gender: null,
      issues: null,
      email: null,
    };

    responseObject.id = response.id;
    responseObject.name = response.name || "person name unknown";
    responseObject.image = response.image.medium_url;
    responseObject.website = response.website;
    responseObject.birth = response.birth;
    responseObject.hometown = response.hometown;
    responseObject.count_of_issue_appearances =
      response.count_of_issue_appearances;
    responseObject.country = response.country;
    responseObject.death = response.death;
    responseObject.deck = response.deck;
    responseObject.description = response.description;
    responseObject.aliases = response.aliases || null;
    responseObject.email = response.email;

    responseObject.created_characters = response.created_characters
      ? response.created_characters.map((character) => {
          return { id: character.id, name: character.name };
        })
      : null;

    switch (response.gender) {
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

    responseObject.issues = response.issues.length
      ? response.issues
          .filter((issue) => issue.name) //only show issues with a name
          .slice(0, 40) //only show first 40 issues
          .map((issue) => {
            return { id: issue.id, name: issue.name };
          })
      : null;

    //Save person into database when it does not exist in the database
    PersonModel.findOne({ id: responseObject.id }, (err, person) => {
      if (!person) {
        PersonModel.create({
          id: responseObject.id,
          name: responseObject.name,
          image: responseObject.image,
          accesscount: 1,
        });
      } else {
        person.accesscount++;
        person.image = responseObject.image;
        person.save();
      }
    });

    res.json(responseObject);

    //Save every issue where the current person appeared into the database. But only if it does not already exist in the database
    const issuesToSave = responseObject.issues || [];
    issuesToSave.forEach((item) => {
      ComicModel.findOne({ id: item.id }, "", (err, docs) => {
        if (!docs) {
          ComicModel.create(
            { id: item.id, name: item.name, image: null, accesscount: 0 },
            (err) => {
              console.log("inserted");
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

export const getPeopleByNameFilter = (req, res) => {
  const personName = req.params.personName;

  const regex = new RegExp(personName, "i"); //selects all the people that have the substring the user typed in

  PersonModel.find(
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

export const getRandomPerson = async (req, res) => {
  PersonModel.getRandomPerson((err, person) => {
    res.json(person);
  });
};
