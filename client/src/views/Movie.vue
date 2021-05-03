<template>
  <div class="max-w-7xl">
    <!-- TODO: format page different than heropage or give a hint that this is a movie -->
    <!-- TODO: maybe link publisher? -->
    <h1 class="uppercase text-2xl p-4 bg-red-500 text-white">
      {{ movieJSON[0]["name"] }}
    </h1>
    <div class="flex flex-wrap overflow-hidden">
      <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
        <div class="w-full overflow-hidden flex justify-center mb-10">
          <div v-if="movieJSON.length">
            <div v-for="item in movieJSON" :key="item.id">
              <img :src="item.imageURL" class="max-h-80" alt="image" />
            </div>
          </div>
        </div>
        <table class="">
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
          <tr>
            <th class="uppercase">Studios</th>
            <td v-if="studios">
              <p v-for="item in studios" :key="item.id">
                {{ item.name }}
              </p>
            </td>
            <td v-else></td>
          </tr>
          <tr>
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
      <div class="w-fulloverflow-hidden md:w-4/6 p-10">
        <h1 class="text-lg uppercase pb-2">Story</h1>
        <p class="pb-4">
          {{ movieJSON[0]["story"] }}
        </p>
        <!-- TODO: check if field is empty and maybe add placeholder text or links to other movies,... -->
        <h1 class="text-lg uppercase pb-2">More Information</h1>
        <p class="pb-4">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
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
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/movie/${this.currentID}`);
      this.movieJSON = response.data;
      this.studios = this.movieJSON.studios;
      this.writers = this.movieJSON.writers;
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
</style>

