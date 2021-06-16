<template>
  <div>
    <h1 class="uppercase text-3xl text-red-500 font-bold mb-2 text-center">
      Find a Comic
    </h1>
    <div class="text-center">
      <search :dataType="dataType" />
    </div>
    <div v-if="trendiestComic" class="mb-10 mt-16">
      <div class="flex justify-center">
        <trending-item
          dataType="comic"
          :id="trendiestComic.id"
          :name="trendiestComic.name"
          :imageURL="trendiestComic.image"
          :type="'trending'"
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
  name: "ComicsOverview",
  components: { TrendingItem, Search },
  props: {},
  watch: {},
  data() {
    return {
      dataType: "comic",
      trendiestComic: null,
    };
  },
  mounted: async function () {
    try {
      const responseTrendiestComic = await axios.get(`/api/comic-trendiest`);
      this.trendiestComic = responseTrendiestComic.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
</style>