<template>
  <div>
    <h1 class="uppercase">Movies Overview</h1>
    <div>
      <input
        type="text"
        class="border border-gray-500 py-2 px-4"
        v-model="inputText"
      />
      <button
        @click="getMoviesByName"
        class="bg-red-500 hover:bg-red-700 text-white uppercase py-2 px-4 m-4 rounded"
      >
        Send Axios Request
      </button>
    </div>
    <div v-if="moviesJSON.length" class="grid grid-rows-6 gap-1 grid-flow-col">
      <div v-for="item in moviesJSON" :key="item.id">
        <overview-item
          :dataType="dataType"
          :id="item.id"
          :name="item.name"
          :imageURL="item.imageURL"
        />
      </div>
    </div>
    <div
      v-if="randomMovieJSON.length"
      class="grid grid-rows-6 gap-1 grid-flow-col"
    >
      <div v-for="item in randomMovieJSON" :key="item.id">
        <overview-item
          :dataType="dataType"
          :id="item.id"
          :name="item.name"
          :imageURL="item.imageURL"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OverviewItem from "../components/OverviewItem.vue";
export default {
  name: "MoviesOverview",
  components: { OverviewItem },
  props: {},
  watch: {},
  data() {
    return {
      moviesJSON: {},
      inputText: "",
      dataType: "movie",
      randomMovieJSON: {},
    };
  },
  mounted: async function () {
    try {
      const responseRandomMovie = await axios.get(`/api/movierandom`);
      this.randomMovieJSON = responseRandomMovie.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async getMoviesByName() {
      try {
        const response = await axios.get(`/api/movie/name/${this.inputText}`);
        this.moviesJSON = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>