<template>
  <div>
    <h1 class="uppercase text-3xl text-red-500 font-bold mb-2 text-center">
      Find a Movie
    </h1>
    <div class="text-center">
      <search :dataType="dataType" />
    </div>
    <div v-if="randomMovie" class="mb-10 mt-16">
      <div class="flex justify-center">
        <trending-item
          dataType="movie"
          :id="randomMovie.id"
          :name="randomMovie.name"
          :imageURL="randomMovie.image"
          :type="'random'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TrendingItem from "../components/TrendingItem.vue";
import Search from "../components/Search.vue";
export default {
  name: "MoviesOverview",
  components: { TrendingItem, Search },
  props: {},
  watch: {},
  data() {
    return {
      dataType: "movie",
      randomMovie: null,
    };
  },
  mounted: async function () {
    try {
      const responseRandomMovie = await axios.get(`/api/movierandom`);
      this.randomMovie = responseRandomMovie.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
</style>