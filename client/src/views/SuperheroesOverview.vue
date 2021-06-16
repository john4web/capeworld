<template>
  <div>
    <h1 class="uppercase text-3xl text-red-500 font-bold mb-2 text-center">
      Find a Superhero
    </h1>
    <div class="text-center">
      <search :dataType="dataType" />
    </div>
    <div v-if="trendiestHero" class="mb-10 mt-16">
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
import Search from "../components/Search.vue";
const axios = require("axios");
import TrendingItem from "../components/TrendingItem.vue";
export default {
  name: "SuperheroesOverview",
  components: { Search, TrendingItem },
  props: {},
  watch: {},
  data() {
    return {
      dataType: "superhero",
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
  methods: {},
};
</script>

<style scoped>
</style>
