<template>
  <div class="w-full md:max-w-7xl">
    <rotate-square2 :class="{ hidden: !showLoader }"></rotate-square2>
    <div :class="{ hidden: showLoader }">
      <div class="p-4 bg-yellow-500 headline">
        <h1
          class="uppercase flex text-2xl text-white mt-3"
          v-if="comicJSON.name"
        >
          {{ comicJSON.name }}
        </h1>

        <p
          class="uppercase text-white border-2 rounded-lg text-center border-white p-2 m-2"
        >
          Comic
        </p>
      </div>
      <div class="flex flex-wrap overflow-hidden">
        <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
          <div class="w-full overflow-hidden flex justify-center mb-10">
            <div v-if="comicJSON.image">
              <div>
                <img :src="comicJSON.image" class="max-h-80" alt="image" />
              </div>
            </div>
          </div>
          <table class="profileInfo w-full mr-auto ml-auto">
            <tr v-if="comicJSON.name">
              <th class="uppercase">Name</th>
              <td>{{ comicJSON.name }}</td>
            </tr>
            <tr v-if="comicJSON.issue_number">
              <th class="uppercase">Issue Number</th>
              <td>{{ comicJSON.issue_number }}</td>
            </tr>
            <tr v-if="comicJSON.cover_date">
              <th class="uppercase">Cover Date</th>
              <td>{{ comicJSON.cover_date }}</td>
            </tr>
            <tr v-if="comicJSON.store_date">
              <th class="uppercase">Store Date</th>
              <td>{{ comicJSON.store_date }}</td>
            </tr>
            <tr v-if="comicJSON.volume_name">
              <th class="uppercase">Volume</th>
              <td>{{ comicJSON.volume_name }}</td>
            </tr>
            <tr v-if="comicJSON.person_credits">
              <th class="uppercase">Persons</th>
              <td>
                <p v-for="item in comicJSON.person_credits" :key="item.id">
                  {{ item.name + " role:" + item.role }}
                </p>
              </td>
            </tr>
            <tr v-if="comicJSON.character_died_in">
              <th class="uppercase">Characters died in this issue:</th>
              <td>
                <p v-for="item in comicJSON.character_died_in" :key="item.id">
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </p>
              </td>
            </tr>
            <tr v-if="comicJSON.character_credits">
              <th class="uppercase">Characters participating in this issue:</th>
              <td>
                <p v-for="item in comicJSON.character_credits" :key="item.id">
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </p>
              </td>
            </tr>

            <tr v-if="comicJSON.first_appearance_characters">
              <th class="uppercase">
                Characters first appeared in this issue:
              </th>
              <td>
                <p
                  v-for="item in comicJSON.first_appearance_characters"
                  :key="item.id"
                >
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </p>
              </td>
            </tr>

            <!-- Diese Sachen auch noch anzeigen. Aber auf null überprüfen!
      comicJSON.deck
      comicJSON.team_credits
      comicJSON.aliases
      comicJSON.first_appearance_teams
 -->
          </table>
        </div>
        <div class="w-full overflow-hidden md:w-4/6 p-10 mr-auto ml-auto">
          <h1 class="text-lg uppercase pb-2">Story:</h1>
          <p
            v-if="comicJSON.description"
            class="pb-4"
            v-html="comicJSON.description"
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
  name: "Comic",
  components: { RotateSquare2 },
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      comicJSON: {},
      showLoader: true,
    };
  },

  mounted: async function () {
    try {
      this.showLoader = true;
      const response = await axios.get(`/api/comic/${this.currentID}`);
      this.comicJSON = response.data;
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
.spinner[data-v-fa81853e]:after {
  background: #f59e0b;
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
</style>