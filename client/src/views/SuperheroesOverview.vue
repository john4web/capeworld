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
    <router-link
      :to="`/superhero/${superheroesID[0]}`"
      class="uppercase text-white hover:text-red-500 m-4"
      >{{ superheroesJSON[0] }}</router-link
    >
    <router-link
      :to="`/superhero/${superheroesID[1]}`"
      class="uppercase text-white hover:text-red-500 m-4"
      >{{ superheroesJSON[1] }}</router-link
    >
    <router-link
      :to="`/superhero/${superheroesID[2]}`"
      class="uppercase text-white hover:text-red-500 m-4"
      >{{ superheroesJSON[2] }}</router-link
    >
    {{ superheroesJSON }}
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
      superheroesJSON: [],
      superheroesID: [],
      inputText: "",
    };
  },

  mounted() {},
  methods: {
    async getHeroesByName() {
      try {
        const response = await axios.get(`/api/hero/name/${this.inputText}`);
        var api = response.data.SuperheroesAPI;
        var size = Object.keys(api).length;
        var i;
        for (i = 0; i < size; i++) {
          this.superheroesJSON[i] = response.data.SuperheroesAPI[i].name;
          this.superheroesID[i] = response.data.SuperheroesAPI[i].id;
          console.log(this.superheroesJSON[i]);
        }
        console.log(this.superheroesJSON[5]);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
