<template>
  <div>
    <!-- <div v-if="randomQuote">
      <h2 class="uppercase">Random Quote</h2>
      <p class="text-lg mt-4 italic">{{ randomQuote.quote }}</p>
      <router-link :to="`/superhero/${randomQuote.author.id}`">
        <p class="text-red-500 mb-4">- {{ randomQuote.author.name }}</p>
      </router-link>
      <img :src="randomQuote.author.image" alt="" />
    </div> -->

    <div v-if="randomMovie" class="mb-10">
      <div class="justify-center">
        <trending-item
          :dataType="dataTypeMovie"
          :id="randomMovie.id"
          :name="randomMovie.name"
          :imageURL="randomMovie.image"
          :trending="false"
        />
      </div>
    </div>
    <div v-if="randomComic" class="mb-10">
      <div class="flex justify-center">
        <trending-item
          :dataType="dataTypeComic"
          :id="randomComic.id"
          :name="randomComic.name"
          :imageURL="randomComic.image"
          :trending="false"
        />
      </div>
    </div>

    <div v-if="trendiestHero" class="mb-10">
      <div class="flex justify-center">
        <trending-item
          dataType="superhero"
          :id="trendiestHero.id"
          :name="trendiestHero.name"
          :imageURL="trendiestHero.image"
          :trending="true"
        />
        <!-- <span>User accesses: {{ trendiestHero.accesscount }}</span> -->
      </div>
    </div>

    <div v-if="trendiestComic" class="mb-10">
      <div class="flex justify-center">
        <trending-item
          dataType="comic"
          :id="trendiestComic.id"
          :name="trendiestComic.name"
          :imageURL="trendiestComic.image"
          :trending="true"
        />
        <!-- <span>User accesses: {{ trendiestComic.accesscount }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import TrendingItem from "../components/TrendingItem.vue";
export default {
  name: "Home",
  components: { TrendingItem },
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

  mounted: async function () {
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
