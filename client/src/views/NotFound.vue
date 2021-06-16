<template>
  <div>
    <h1 class="uppercase text-3xl text-red-500 font-bold mb-2 text-center">
      404 Page Not Found
    </h1>
    <p class="text-center mt-4 mb-8">Sorry, this page is not available.</p>

    <h2 class="text-center uppercase text-lg">Go to the Homepage</h2>
    <div class="text-center mb-6">
      <router-link to="/" class="uppercase text-red-500 hover:text-red-700"
        >Home</router-link
      >
    </div>
    <h2 class="text-center uppercase text-lg">Or visit a different Page</h2>
    <div class="text-center">
      <router-link
        to="/superheroes"
        class="uppercase text-red-500 hover:text-red-700 m-4 ml-0"
        >Superhero</router-link
      >
      <router-link
        to="/comics"
        class="uppercase text-red-500 hover:text-red-700 m-4"
        >Comic</router-link
      >
      <router-link
        to="/movies"
        class="uppercase text-red-500 hover:text-red-700 m-4"
        >Movie</router-link
      >
      <router-link
        to="/people"
        class="uppercase text-red-500 hover:text-red-700 m-4"
        >Person</router-link
      >
    </div>
    <div v-if="trendiestHero" class="mt-10">
      <div class="flex justify-center">
        <trending-item
          dataType="superhero"
          :id="trendiestHero.id"
          :name="trendiestHero.name"
          :imageURL="trendiestHero.image"
          :type="'trending'"
        />
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import TrendingItem from "../components/TrendingItem.vue";
export default {
  name: "NotFound",
  components: { TrendingItem },
  props: {},
  data() {
    return {
      trendiestHero: null,
    };
  },
  mounted: async function () {
    try {
      const responseTrendiestHero = await axios.get(`/api/hero-trendiest`);
      this.trendiestHero = responseTrendiestHero.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
</style>
