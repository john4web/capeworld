<template>
  <div class="max-w-7xl">
    <!-- TODO: format page different than heropage or give a hint that this is a comic -->
    <h1 class="uppercase text-2xl p-4 bg-red-500 text-white">
      {{ comicJSON[0]["name"] }}
    </h1>
    <div class="flex flex-wrap overflow-hidden">
      <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
        <div class="w-full overflow-hidden flex justify-center mb-10">
          <div v-if="comicJSON.length">
            <div v-for="item in comicJSON" :key="item.id">
              <img :src="item.imageURL" class="max-h-80" alt="image" />
            </div>
          </div>
        </div>
        <table class="">
          <tr>
            <th class="uppercase">Name</th>
            <td>{{ comicJSON[0]["name"] }}</td>
          </tr>
          <tr>
            <th class="uppercase">Issue Number</th>
            <td>{{ comicJSON[0]["issueNumber"] }}</td>
          </tr>
          <tr>
            <th class="uppercase">Cover Date</th>
            <td>{{ comicJSON[0]["coverDate"] }}</td>
          </tr>
          <tr>
            <th class="uppercase">Volume</th>
            <td>{{ comicJSON[0]["volume"] }}</td>
          </tr>
          <tr v-if="personCredits">
            <th class="uppercase">Persons</th>
            <td v-if="personCredits">
              <p v-for="item in personCredits" :key="item.id">
                {{ item.name }}
              </p>
            </td>
            <td v-else></td>
          </tr>
        </table>
      </div>
      <div class="w-full overflow-hidden md:w-4/6 p-10">
        <h1 class="text-lg uppercase pb-2">Story</h1>
        <p class="pb-4" v-html="story"></p>
        <!-- TODO: check if field is empty and maybe add placeholder text or links to other comics,... -->
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
  name: "Comic",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      comicJSON: {},
      personCredits: {},
      story: "",
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/comic/${this.currentID}`);
      this.comicJSON = response.data;
      this.personCredits = this.comicJSON[0]["personCredits"];
      this.story = this.comicJSON[0]["story"];
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