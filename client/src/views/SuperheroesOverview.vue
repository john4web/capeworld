<template>
  <div>
    <h1 class="uppercase">Superheroes Overview</h1>
    <div>
      <input
        type="text"
        class="border border-gray-500 py-2 px-4"
        v-model="inputText"
      />
      <button
        @click="getHeroesByName"
        class="bg-red-500 hover:bg-red-700 text-white uppercase py-2 px-4 m-4 rounded"
      >
        Send Axios Request
      </button>
    </div>
    <div class="grid grid-rows-4 gap-1 grid-flow-col">
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
    </div>
    <div>
      {{ superheroesJSON }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OverviewItem from "../components/OverviewItem.vue";
export default {
  name: "SuperheroesOverview",
  components: { OverviewItem },
  props: {},
  watch: {},
  data() {
    return {
      superheroesJSON: {},
      inputText: "",
    };
  },

  mounted() {},
  methods: {
    async getHeroesByName() {
      try {
        const response = await axios.get(`/api/hero/name/${this.inputText}`);
        this.superheroesJSON = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
