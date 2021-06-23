<template>
  <div class="w-full md:max-w-7xl">
    <rotate-square2 :class="{ hidden: !showLoader }"></rotate-square2>
    <div :class="{ hidden: showLoader }">
      <div v-if="movieNotFound">Movie not found!</div>
      <div v-if="!movieNotFound">
        <div class="p-4 bg-green-500 headline" v-if="movie">
          <h1 class="uppercase inline-block text-2xl text-white mt-3">
            {{ movie.name }}
          </h1>

          <p
            class="
              uppercase
              text-white
              border-2
              rounded-lg
              text-center
              border-white
              p-2
              m-2
            "
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
              <tr v-if="movie.name">
                <th class="uppercase">Name</th>
                <td>{{ movie.name }}</td>
              </tr>
              <tr v-if="movie.ratinge">
                <th class="uppercase">Rating</th>
                <td>{{ movie.rating }}</td>
              </tr>
              <tr v-if="movie.budget">
                <th class="uppercase">Budget</th>
                <td>{{ movie.budget }}</td>
              </tr>
              <tr v-if="movie.release_date">
                <th class="uppercase">Release Date</th>
                <td>{{ movie.release_date }}</td>
              </tr>
              <tr v-if="movie.runtime">
                <th class="uppercase">Runtime</th>
                <td>{{ movie.runtime }}</td>
              </tr>
              <tr v-if="movie.box_office_revenue">
                <th class="uppercase">Box Office Revenue</th>
                <td>{{ movie.box_office_revenue }}</td>
              </tr>
              <tr v-if="movie.total_revenue">
                <th class="uppercase">Total Revenue</th>
                <td>{{ movie.total_revenue }}</td>
              </tr>
              <tr v-if="writers">
                <th class="uppercase">Writers</th>
                <td>
                  <p v-for="writer in writers" :key="writer.id">
                    <router-link :to="`/person/${writer.id}`">
                      {{ writer.name }}</router-link
                    >
                  </p>
                </td>
              </tr>
              <tr v-if="producers">
                <th class="uppercase">Producers</th>
                <td>
                  <p v-for="producer in producers" :key="producer.id">
                    <router-link :to="`/person/${producer.id}`">
                      {{ producer.name }}</router-link
                    >
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
            <h1 class="text-lg uppercase pb-2">Deck</h1>
            <p
              v-if="movie.deck"
              class="pb-4 htmlContent"
              v-html="movie.deck"
            ></p>

            <h1 class="text-lg uppercase pb-2">Story</h1>
            <p v-if="movie.description">
              <show-more :data="movie.description" :color="color" />
            </p>
            <p v-else>
              No additional information about the plot of this movie available
            </p>

            <div class="mb-10">
              <h2 v-if="characters" class="uppercase">
                Characters in this movie:
              </h2>
              <div v-if="characters">
                <character-list
                  :dataType="dataTypeHero"
                  :data="characters"
                  :color="color"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RotateSquare2 } from "vue-loading-spinner";
import CharacterList from "../components/CharacterList.vue";
import ShowMore from "../components/ShowMore.vue";
export default {
  name: "Movie",
  components: { RotateSquare2, CharacterList, ShowMore },
  data() {
    return {
      currentID: this.$route.params.id,
      movie: null,
      writers: null,
      characters: null,
      producers: null,
      studios: null,
      showLoader: true,
      movieNotFound: false,
      dataTypeHero: "superhero",
      color: "green",
    };
  },

  mounted: async function () {
    this.movieNotFound = false;
    try {
      this.showLoader = true;
      const response = await axios.get(`/api/movie/${this.currentID}`);
      this.movie = response.data;
      if ("notFound" in this.movie) {
        this.movieNotFound = true;
      }
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
};
</script>

<style scoped>
.spinner {
  margin-top: 20px;
  margin-left: 50%;
}
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
table a {
  @apply text-green-900;
}
table a:hover {
  @apply text-green-700;
}
</style>

