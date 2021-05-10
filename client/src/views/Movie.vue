<template>
  <div class="w-full md:max-w-7xl">
    <!-- TODO: format page different than heropage or give a hint that this is a movie -->
    <!-- TODO: maybe link publisher? -->
    <div class="p-4 bg-green-500 headline">
      <h1 class="uppercase inline-block text-2xl text-white mt-3">
        {{ movieJSON[0]["name"] }}
      </h1>

      <p
        class="uppercase text-white border-2 rounded-lg text-center border-white p-2 m-2"
      >
        Movie
      </p>
    </div>
    <div class="flex flex-wrap overflow-hidden">
      <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
        <div class="w-full overflow-hidden flex justify-center mb-10">
          <div v-if="movieJSON.length">
            <div v-for="item in movieJSON" :key="item.id">
              <img :src="item.imageURL" class="max-h-80" alt="image" />
            </div>
          </div>
        </div>
        <table class="profileInfo w-full mr-auto ml-auto">
          <tr>
            <th class="uppercase">Name</th>
            <td>{{ movieJSON[0]["name"] }}</td>
          </tr>
          <tr>
            <th class="uppercase">Rating</th>
            <td>{{ movieJSON[0]["rating"] }}</td>
          </tr>
          <tr>
            <th class="uppercase">Release Date</th>
            <td>{{ movieJSON[0]["releaseDate"] }}</td>
          </tr>
          <tr>
            <th class="uppercase">Runtime</th>
            <td>{{ movieJSON[0]["runtime"] }}</td>
          </tr>
          <tr v-if="studios">
            <th class="uppercase">Studios</th>
            <td v-if="studios">
              <p v-for="item in studios" :key="item.id">
                {{ item.name }}
              </p>
            </td>
            <td v-else></td>
          </tr>
          <tr v-if="writers">
            <th class="uppercase">Writers</th>
            <td v-if="writers">
              <p v-for="item in writers" :key="item.id">
                {{ item.name }}
              </p>
            </td>
            <td v-else></td>
          </tr>
        </table>
      </div>
      <div class="w-full overflow-hidden md:w-4/6 p-10 mr-auto ml-auto">
        <h1 class="text-lg uppercase pb-2">Story</h1>
        <p v-if="story" class="pb-4" v-html="story"></p>
        <p v-else>
          No additional information about the plot of this comic available
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Movie",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      movieJSON: {},
      studios: {},
      writers: {},
      story: "",
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/movie/${this.currentID}`);
      this.movieJSON = response.data;
      this.studios = this.movieJSON.studios;
      this.writers = this.movieJSON.writers;
      this.story = this.movieJSON[0]["story"];
    } catch (error) {
      console.error(error);
    }
  },
  methods: {},
};
</script>

<style scoped>
th {
  padding: 10px;
  text-align: left;
  width: 50%;
  border-bottom: solid 1px white;
  @apply bg-gray-900;
  @apply text-white;
}
td {
  width: 50%;
  padding: 10px;
  text-align: right;
  border-bottom: solid 1px white;
  @apply bg-gray-400;
  @apply text-gray-900;
}
table > tr:last-child > td {
  border-bottom: 0 !important;
}
table > tr:last-child > th {
  border-bottom: 0 !important;
}
.headline {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
@media (min-width: 768px) {
  .headline {
    grid-template-columns: repeat(2, 1fr);
    grid-template-columns: 85% 15%;
  }
}
</style>

