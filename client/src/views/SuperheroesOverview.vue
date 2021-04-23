<template>
  <div>
    <h1>Superheroes Overview</h1>
    <div>
      <input type="text" v-model="inputText" />
      <button @click="getHeroesByName">Send Axios Request</button>
    </div>
    <ul v-if="superheroesJSON.length">
      <li v-for="item in superheroesJSON" :key="item.id">
        {{ item.id }}
        {{ item.name }}
        <img :src="item.imageURL" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SuperheroesOverview",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      superheroesJSON: [],
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
