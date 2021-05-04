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
    <rotate-square2 :class="{ hidden: isHidden }"></rotate-square2>
    <div
      v-if="superheroesJSON.length"
      class="grid grid-rows-6 gap-1 grid-flow-col"
    >
      <div v-for="item in superheroesJSON" :key="item.id">
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
import { RotateSquare2 } from "vue-loading-spinner";
export default {
  name: "SuperheroesOverview",
  components: { OverviewItem, RotateSquare2 },
  props: {},
  watch: {},
  data() {
    return {
      superheroesJSON: {},
      inputText: "",
      dataType: "superhero",
      isHidden: true,
    };
  },
  mounted() {},
  methods: {
    async getHeroesByName() {
      this.isHidden = false;
      try {
        const response = await axios.get(`/api/hero/name/${this.inputText}`);
        this.isHidden = true;
        this.superheroesJSON = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.spinner[data-v-fa81853e]:after {
  background: rgba(239, 68, 68);
}

.spinner {
  margin-top: 20px;
  margin-left: 40%;
}
</style>
