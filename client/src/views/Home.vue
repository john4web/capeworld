<template>
  <div>
    <h1 class="uppercase">Home</h1>
    <h2 class="uppercase">Random Quote</h2>
    <p class="text-lg mt-4 italic">{{ randomQuoteJSON[0]["quote"] }}</p>
    <p class="text-red-500 mb-4">- {{ randomQuoteJSON[0]["author"] }}</p>
    <h2 class="uppercase">Random Movie</h2>
    <div
      v-if="randomMovieJSON.length"
      class="overview-cols mr-auto ml-auto mb-10"
    >
      <div
        class="flex justify-center"
        v-for="item in randomMovieJSON"
        :key="item.id"
      >
        <overview-item
          :dataType="dataTypeMovie"
          :id="item.id"
          :name="item.name"
          :imageURL="item.imageURL"
        />
      </div>
    </div>
    <h2 class="uppercase">Random Comic</h2>
    <div
      v-if="randomComicJSON.length"
      class="overview-cols mr-auto ml-auto mb-10"
    >
      <div
        class="flex justify-center"
        v-for="item in randomComicJSON"
        :key="item.id"
      >
        <overview-item
          :dataType="dataTypeComic"
          :id="item.id"
          :name="item.name"
          :imageURL="item.imageURL"
        />
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import OverviewItem from "../components/OverviewItem.vue";
export default {
  name: "Home",
  components: { OverviewItem },
  data() {
    return {
      dataTypeMovie: "movie",
      dataTypeComic: "comic",
      randomMovieJSON: {},
      randomComicJSON: {},
      randomQuoteJSON: {},
    };
  },
  // data: () => ({
  //   error: "",
  //   output: [],
  // }),

  // mounted() {
  //   fetch(API_URL)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //     });
  //   // axios
  //   //   .post(API_URL, {
  //   //     firstName: "Johannes",
  //   //     lastName: "Gerstbauer",
  //   //     email: "test@example.com",
  //   //     company: "FH-HGB",
  //   //     phone: "12345678",
  //   //   })
  //   //   .then(function (response) {
  //   //     console.log(response);
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  // },
  // methods: {},
  mounted: async function () {
    // axios
    //   .get("/api/hero/1")
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    try {
      const responseRandomQuote = await axios.get(`/api/quote`);
      this.randomQuoteJSON = responseRandomQuote.data;
      const responseRandomComic = await axios.get(`/api/comicrandom`);
      this.randomComicJSON = responseRandomComic.data;
      const responseRandomMovie = await axios.get(`/api/movierandom`);
      this.randomMovieJSON = responseRandomMovie.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
