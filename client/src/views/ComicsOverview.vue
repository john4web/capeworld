<template>
  <div>
    <h1 class="uppercase">Comics Overview</h1>
    <div>
      <input
        type="text"
        class="border border-gray-500 py-2 px-4"
        v-model="inputText"
      />
      <button
        @click="getComicsByName"
        class="bg-red-500 hover:bg-red-700 text-white uppercase py-2 px-4 m-4 rounded"
      >
        Send Axios Request
      </button>
    </div>
    <div v-if="comicsJSON.length" class="grid grid-rows-6 gap-1 grid-flow-col">
      <div v-for="item in comicsJSON" :key="item.id">
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
  name: "ComicsOverview",
  components: { OverviewItem },
  props: {},
  watch: {},
  data() {
    return {
      comicsJSON: {},
      inputText: "",
      dataType: "comic",
    };
  },
  mounted() {},
  methods: {
    async getComicsByName() {
      try {
        const response = await axios.get(`/api/comic/name/${this.inputText}`);
        this.comicsJSON = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>