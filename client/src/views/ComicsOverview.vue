<template>
  <div>
    <h1 class="uppercase">Comics Overview</h1>
    <search :dataType="dataType" />
    <div
      v-if="randomComicJSON.length"
      class="grid grid-rows-6 gap-1 grid-flow-col"
    >
      <div v-for="item in randomComicJSON" :key="item.id">
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
  name: "ComicsOverview",
  components: { OverviewItem, Search },
  props: {},
  watch: {},
  data() {
    return {
      dataType: "comic",
      randomComicJSON: {},
    };
  },
  mounted: async function () {
    try {
      const responseRandomComic = await axios.get(`/api/comicrandom`);
      this.randomComicJSON = responseRandomComic.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
</style>