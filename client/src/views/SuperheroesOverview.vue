<template>
  <div>
    <h1 class="uppercase">Superheroes Overview</h1>
    <div>
      <input
        type="text"
        class="border border-gray-500 py-2 px-4"
        v-model="inputText"
        @keyup="getHeroesByName"
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
      class="grid gap-1 grid-flow-col"
      :class="{
        'grid-rows-25 ': rows25,
        'grid-rows-20 ': rows20,
        'grid-rows-10 ': rows10,
        'grid-rows-6 ': rows6,
      }"
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
      rows25: false,
      rows20: false,
      rows10: false,
      rows6: true,
    };
  },
  mounted() {},
  methods: {
    async getHeroesByName() {
      if (this.inputText.length > 2) {
        this.isHidden = false;
        try {
          const response = await axios.get(`/api/hero/name/${this.inputText}`);
          this.isHidden = true;
          this.superheroesJSON = response.data;
          if (this.superheroesJSON.length > 120) {
            this.rows25 = true;
            this.rows20 = false;
            this.rows10 = false;
            this.rows6 = false;
          } else if (
            this.superheroesJSON.length > 60 &&
            this.superheroesJSON.length <= 120
          ) {
            this.rows25 = false;
            this.rows20 = true;
            this.rows10 = false;
            this.rows6 = false;
          } else if (
            this.superheroesJSON.length > 36 &&
            this.superheroesJSON.length <= 60
          ) {
            this.rows25 = false;
            this.rows20 = false;
            this.rows10 = true;
            this.rows6 = false;
          } else {
            this.rows25 = false;
            this.rows20 = false;
            this.rows10 = false;
            this.rows6 = true;
          }
        } catch (error) {
          console.error(error);
        }
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
.grid-rows-10 {
  grid-template-rows: repeat(10, minmax(0, 1fr));
}
.grid-rows-20 {
  grid-template-rows: repeat(20, minmax(0, 1fr));
}
.grid-rows-25 {
  grid-template-rows: repeat(25, minmax(0, 1fr));
}
</style>
