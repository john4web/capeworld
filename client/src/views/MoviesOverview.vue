<template>
  <div>
    <h1 class="uppercase">Movies Overview</h1>
    <search :dataType="dataType" />
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
import Search from "../components/Search.vue";
export default {
  name: "MoviesOverview",
  components: { OverviewItem, Search },
  props: {},
  watch: {},
  data() {
    return {
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
};
</script>

<style scoped>
</style>