<template>
  <div>
    <div class="flex justify-center">
      <div>
        <img class="search" src="../assets/search.svg" alt="search" />
        <input
          type="text"
          class="border border-gray-400 py-2 px-4 input-field rounded-full"
          v-model="inputText"
          @keyup="getResultsByName"
        />
      </div>
    </div>
    <rotate-square2 :class="{ hidden: isHidden }"></rotate-square2>
    <div v-if="resultsJSON.length" class="overview-cols mr-auto ml-auto mb-10">
      <div
        class="flex justify-center"
        v-for="item in resultsJSON"
        :key="item.id"
      >
        <overview-item
          :dataType="type"
          :id="item.id"
          :name="item.name"
          :imageURL="item.image"
        />
      </div>
    </div>
    <div class="mt-4" v-else>
      <div v-if="dataType === 'superhero'">No Heroes found!</div>
      <div v-if="dataType === 'comic'">No Comics found!</div>
      <div v-if="dataType === 'movie'">No Movies found!</div>
      <div v-if="dataType === 'person'">No People found!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OverviewItem from "../components/OverviewItem.vue";
import { RotateSquare2 } from "vue-loading-spinner";

let cancel;
let CancelToken = axios.CancelToken;

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

      if (this.inputText.length > 2) {
        this.isHidden = false;

        try {
          //only call cancel() if cancel is true
          cancel && cancel();
          const response = await axios.get(
            `/api/${this.responseType}/name/${this.inputText}`,
            {
              cancelToken: new CancelToken((c) => {
                cancel = c;
              }),
            }
          );
          this.isHidden = true;
          this.resultsJSON = response.data;
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request Cancelled");
          } else {
            console.error(error);
          }
        }
      } else {
        this.resultsJSON = {};
      }
    },
  },
};
</script>

<style scoped>
.spinner[data-v-fa81853e]:after {
  @apply bg-red-500;
}

.spinner {
  margin-top: 20px;
  margin-left: 47%;
}
.search {
  width: 18px;
}
.overview-cols {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
@media (min-width: 768px) {
  .overview-cols {
    grid-template-columns: repeat(3, 1fr);
  }
}
.search {
  position: absolute;
  margin-top: 12px;
  margin-left: 10px;
}
.input-field {
  padding-left: 35px;
}
</style>
