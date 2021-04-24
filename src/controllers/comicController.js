import axios from "axios";
import credentials from "../../api_credentials";

export const getComicByID = async (req, res) => {
  var comicID = req.params.comicID;
  try {
    const response = await axios.get(
      `https://comicvine.gamespot.com/api/issue/4000-${comicID}/?api_key=${credentials.comic_vines_api.access_token}&format=json`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getComicsByNameFilter = (req, res) => {
  const comicName = req.params.comicName;

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
  // ToDo: Handle Promise Timeout. What if the API-Calls take 5 hours?
  // ToDo: Handle Promise Timeout on frontend
};

export const getRandomComic = (req, res) => {};

export const getRandomComics = (req, res) => {};
