<template>
  <div>
    <h1 class="uppercase">Home</h1>
    <div v-if="randomQuote">
      <h2 class="uppercase">Random Quote</h2>
      <p class="text-lg mt-4 italic">{{ randomQuote.quote }}</p>
      <router-link :to="`/superhero/${randomQuote.author.id}`">
        <p class="text-red-500 mb-4">- {{ randomQuote.author.name }}</p>
      </router-link>
      <img :src="randomQuote.author.image" alt="" />
    </div>
    <h2 class="uppercase">Random Movie</h2>
    <div v-if="randomMovie" class="overview-cols mr-auto ml-auto mb-10">
      <div class="flex justify-center">
        <overview-item
          :dataType="dataTypeMovie"
          :id="randomMovie.id"
          :name="randomMovie.name"
          :imageURL="randomMovie.image"
        />
      </div>
    </div>
    <h2 class="uppercase">Random Comic</h2>
    <div v-if="randomComic" class="overview-cols mr-auto ml-auto mb-10">
      <div class="flex justify-center">
        <overview-item
          :dataType="dataTypeComic"
          :id="randomComic.id"
          :name="randomComic.name"
          :imageURL="randomComic.image"
        />
      </div>
    </div>

    <h2 class="uppercase">Trendiest Hero:</h2>
    <div v-if="trendiestHero" class="overview-cols mr-auto ml-auto mb-10">
      <div class="flex justify-center">
        <overview-item
          dataType="superhero"
          :id="trendiestHero.id"
          :name="trendiestHero.name"
          :imageURL="trendiestHero.image"
        />
        <span>User accesses: {{ trendiestHero.accesscount }}</span>
      </div>
    </div>

    <h2 class="uppercase">Trendiest Comic:</h2>
    <div v-if="trendiestComic" class="overview-cols mr-auto ml-auto mb-10">
      <div class="flex justify-center">
        <overview-item
          dataType="comic"
          :id="trendiestComic.id"
          :name="trendiestComic.name"
          :imageURL="trendiestComic.image"
        />
        <span>User accesses: {{ trendiestComic.accesscount }}</span>
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
      randomMovie: null,
      randomComic: null,
      randomQuote: null,
      trendiestHero: null,
      trendiestComic: null,
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
      this.randomQuote = responseRandomQuote.data;
      const responseRandomComic = await axios.get(`/api/comicrandom`);
      this.randomComic = responseRandomComic.data;
      const responseRandomMovie = await axios.get(`/api/movierandom`);
      this.randomMovie = responseRandomMovie.data;
      const responseTrendiestHero = await axios.get(`/api/hero-trendiest`);
      this.trendiestHero = responseTrendiestHero.data;
      const responseTrendiestComic = await axios.get(`/api/comic-trendiest`);
      this.trendiestComic = responseTrendiestComic.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
