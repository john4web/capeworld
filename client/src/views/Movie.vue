<template>
  <div class="w-full md:max-w-7xl">
    <rotate-square2 :class="{ hidden: !showLoader }"></rotate-square2>
    <div :class="{ hidden: showLoader }">
      <div class="p-4 bg-green-500 headline" v-if="movie">
        <h1 class="uppercase inline-block text-2xl text-white mt-3">
          {{ movie.name }}
        </h1>

        <p
          class="uppercase text-white border-2 rounded-lg text-center border-white p-2 m-2"
        >
          Movie
        </p>
      </div>
      <div class="flex flex-wrap overflow-hidden" v-if="movie">
        <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
          <div class="w-full overflow-hidden flex justify-center mb-10">
            <div>
              <div>
                <img :src="movie.image" class="max-h-80" alt="image" />
              </div>
            </div>
          </div>
          <table class="profileInfo w-full mr-auto ml-auto">
            <tr>
              <th class="uppercase">Name</th>
              <td>{{ movie.name }}</td>
            </tr>
            <tr>
              <th class="uppercase">Rating</th>
              <td>{{ movie.rating }}</td>
            </tr>
            <tr>
              <th class="uppercase">Budget</th>
              <td>{{ movie.budget }}</td>
            </tr>
            <tr>
              <th class="uppercase">Deck</th>
              <td>{{ movie.deck }}</td>
            </tr>
            <tr>
              <th class="uppercase">Release Date</th>
              <td>{{ movie.release_date }}</td>
            </tr>
            <tr>
              <th class="uppercase">Runtime</th>
              <td>{{ movie.runtime }}</td>
            </tr>
            <tr>
              <th class="uppercase">Box Office Revenue</th>
              <td>{{ movie.box_office_revenue }}</td>
            </tr>
            <tr>
              <th class="uppercase">Total Revenue</th>
              <td>{{ movie.total_revenue }}</td>
            </tr>
            <tr v-if="writers">
              <th class="uppercase">Writers</th>
              <td>
                <p v-for="(writer, index) in writers" :key="'writer' + index">
                  {{ writer }}
                </p>
              </td>
            </tr>
            <tr v-if="characters">
              <th class="uppercase">Characters</th>
              <td>
                <p v-for="character in characters" :key="character.id">
                  <router-link :to="`/superhero/${character.id}`">
                    {{ character.name }}</router-link
                  >
                </p>
              </td>
            </tr>
            <tr v-if="producers">
              <th class="uppercase">Producers</th>
              <td>
                <p
                  v-for="(producer, index) in producers"
                  :key="'producer' + index"
                >
                  {{ producer }}
                </p>
              </td>
            </tr>
            <tr v-if="studios">
              <th class="uppercase">Studios</th>
              <td>
                <p v-for="(studio, index) in studios" :key="'studio' + index">
                  {{ studio }}
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div class="w-full overflow-hidden md:w-4/6 p-10 mr-auto ml-auto">
          <h1 class="text-lg uppercase pb-2">Story</h1>
          <p
            v-if="movie.description"
            class="pb-4"
            v-html="movie.description"
          ></p>
          <p v-else>
            No additional information about the plot of this comic available
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RotateSquare2 } from "vue-loading-spinner";
export default {
  name: "Movie",
  components: { RotateSquare2 },
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      movie: null,
      writers: null,
      characters: null,
      producers: null,
      studios: null,
      showLoader: true,
    };
  },

  mounted: async function () {
    try {
      this.showLoader = true;
      const response = await axios.get(`/api/movie/${this.currentID}`);
      this.movie = response.data;
      this.writers = response.data.writers;
      this.characters = response.data.characters;
      this.producers = response.data.producers;
      this.studios = response.data.studios;
    } catch (error) {
      console.error(error);
    } finally {
      this.showLoader = false;
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

