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
    </div>
    <ul v-if="superheroesJSON.length">
      <li v-for="item in superheroesJSON" :key="item.id">
        <router-link
          :to="`/superhero/${item.id}`"
          class="uppercase text-white hover:text-red-500 m-4"
          >{{ item.name }}</router-link
        >
        <img :src="item.imageURL" />
      </li>
    </ul>
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
