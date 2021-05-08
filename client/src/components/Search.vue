<template>
  <div>
    <div class="flex">
      <div>
        <input
          type="text"
          class="border border-gray-500 py-2 px-4"
          v-model="inputText"
          @keyup="searchTimeOut"
          @keyup.enter="searchTimeOut"
        />
      </div>
      <div>
        <button
          @click="getResultsByName"
          class="bg-red-500 hover:bg-red-700 py-3 px-4 rounded"
        >
          <img class="search" src="../assets/search.svg" alt="logo" />
        </button>
      </div>
    </div>
    <rotate-square2 :class="{ hidden: isHidden }"></rotate-square2>
    <div
      v-if="resultsJSON.length"
      class="grid gap-1 grid-flow-col"
      :class="{
        'grid-rows-25 ': rows25,
        'grid-rows-20 ': rows20,
        'grid-rows-10 ': rows10,
        'grid-rows-6 ': rows6,
      }"
    >
      <div v-for="item in resultsJSON" :key="item.id">
        <overview-item
          :dataType="type"
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
  name: "Search",
  components: { OverviewItem, RotateSquare2 },
  props: ["dataType"],
  watch: {},
  data() {
    return {
      resultsJSON: {},
      inputText: "",
      isHidden: true,
      rows25: false,
      rows20: false,
      rows10: false,
      rows6: true,
      type: this.$props.dataType,
      responseType: "",
    };
  },
  mounted() {},
  methods: {
    async getResultsByName() {
      if (this.type == "superhero") {
        this.responseType = "hero";
      } else {
        this.responseType = this.type;
      }
      let timeout = null;
      clearTimeout(timeout);
      if (this.inputText.length > 2) {
        this.isHidden = false;
        const cancelTokenSource = axios.CancelToken.source();
        try {
          const response = await axios.get(
            `/api/${this.responseType}/name/${this.inputText}`,
            {
              cancelToken: cancelTokenSource.token,
            }
          );
          this.isHidden = true;
          this.resultsJSON = response.data;
          if (this.resultsJSON.length > 120) {
            this.rows25 = true;
            this.rows20 = false;
            this.rows10 = false;
            this.rows6 = false;
          } else if (
            this.resultsJSON.length > 60 &&
            this.resultsJSON.length <= 120
          ) {
            this.rows25 = false;
            this.rows20 = true;
            this.rows10 = false;
            this.rows6 = false;
          } else if (
            this.resultsJSON.length > 30 &&
            this.resultsJSON.length <= 60
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
          //cancelTokenSource.cancel();
        } catch (error) {
          console.error(error);
        }
      }
    },
    searchTimeOut() {
      let timeout = null;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.getResultsByName();
      }, 2000);
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

.search {
  width: 18px;
}
</style>
