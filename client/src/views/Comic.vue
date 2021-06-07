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
            <tr v-if="comicJSON.aliases">
              <th class="uppercase">Aliases</th>
              <td>
                <p v-for="item in comicJSON.aliases" :key="item.id">
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </p>
              </td>
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
            <tr v-if="comicJSON.team_credits">
              <th class="uppercase">Team Credits</th>
              <td>
                <p
                  v-for="(credit, index) in comicJSON.team_credits"
                  :key="'credit' + index"
                >
                  {{ credit }}
                </p>
              </td>
            </tr>
            <tr v-if="comicJSON.first_appearance_teams">
              <th class="uppercase">First appearance Teams</th>
              <td>
                <p
                  v-for="item in comicJSON.first_appearance_teams"
                  :key="item.id"
                >
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div class="w-full overflow-hidden md:w-4/6 p-10 mr-auto ml-auto">
          <h1 v-if="comicJSON.deck" class="text-lg uppercase pb-2">Deck</h1>
          <p v-if="comicJSON.deck" class="pb-4" v-html="comicJSON.deck"></p>
          <h1 class="text-lg uppercase pb-2">Story</h1>
          <p
            v-if="comicJSON.description"
            class="pb-4"
            v-html="comicJSON.description"
          ></p>
          <p v-else>
            No additional information about the plot of this comic available
          </p>

          <div class="mb-10">
            <h2 v-if="comicJSON.character_credits" class="uppercase">
              Characters participating in this issue
            </h2>
            <div class="flex flex-wrap" v-if="comicJSON.character_credits">
              <div
                class="
                  text-yellow-500
                  border-2
                  rounded-lg
                  border-yellow-500
                  p-2
                  m-2
                "
                :class="{ hidden: !moreCharactersAreHidden }"
                v-for="item in comicJSON.character_credits.slice(0, 5)"
                :key="item.id"
              >
                <router-link :to="`/superhero/${item.id}`">
                  {{ item.name }}</router-link
                >
              </div>
              <div
                class="
                  text-yellow-500
                  border-2
                  rounded-lg
                  border-yellow-500
                  p-2
                  m-2
                "
                :class="{ hidden: moreCharactersAreHidden }"
                v-for="item in comicJSON.character_credits"
                :key="item.id + 'more_friends'"
              >
                <router-link :to="`/superhero/${item.id}`">
                  {{ item.name }}</router-link
                >
              </div>
            </div>
            <div
              class="
                text-yellow-500
                border-2
                rounded-lg
                border-yellow-500
                p-2
                m-2
              "
              :class="{ hidden: moreCharactersAreHidden }"
              v-else
            >
              <router-link
                :to="`/superhero/${characters.id}`"
                v-if="comicJSON.character_credits"
              >
                {{ comicJSON.character_credits.name }}</router-link
              >
            </div>
            <button
              v-if="
                comicJSON.character_credits &&
                comicJSON.character_credits.length > 5
              "
              @click="moreCharactersAreHidden = false"
              :class="{ hidden: !moreCharactersAreHidden }"
              class="
                bg-yellow-500
                hover:bg-yellow-700
                text-white
                py-3
                px-4
                rounded
              "
            >
              Show All
            </button>
            <button
              v-if="
                comicJSON.character_credits &&
                comicJSON.character_credits.length > 5
              "
              @click="moreCharactersAreHidden = true"
              :class="{ hidden: moreCharactersAreHidden }"
              class="
                bg-yellow-500
                hover:bg-yellow-700
                text-white
                py-3
                px-4
                rounded
              "
            >
              Hide
            </button>
          </div>

          <div class="mb-10">
            <h2 v-if="comicJSON.first_appearance_characters" class="uppercase">
              Characters with first appearance in this issue
            </h2>
            <div
              class="flex flex-wrap"
              v-if="comicJSON.first_appearance_characters"
            >
              <div
                class="
                  text-yellow-500
                  border-2
                  rounded-lg
                  border-yellow-500
                  p-2
                  m-2
                "
                :class="{ hidden: !moreFirstCharactersAreHidden }"
                v-for="item in comicJSON.first_appearance_characters.slice(
                  0,
                  5
                )"
                :key="item.id"
              >
                <router-link :to="`/superhero/${item.id}`">
                  {{ item.name }}</router-link
                >
              </div>
              <div
                class="
                  text-yellow-500
                  border-2
                  rounded-lg
                  border-yellow-500
                  p-2
                  m-2
                "
                :class="{ hidden: moreFirstCharactersAreHidden }"
                v-for="item in comicJSON.first_appearance_characters"
                :key="item.id + 'more_friends'"
              >
                <router-link :to="`/superhero/${item.id}`">
                  {{ item.name }}</router-link
                >
              </div>
            </div>
            <div
              class="
                text-yellow-500
                border-2
                rounded-lg
                border-yellow-500
                p-2
                m-2
              "
              :class="{ hidden: moreFirstCharactersAreHidden }"
              v-else
            >
              <router-link
                :to="`/superhero/${characters.id}`"
                v-if="comicJSON.first_appearance_characters"
              >
                {{ comicJSON.first_appearance_characters.name }}</router-link
              >
            </div>
            <button
              v-if="
                comicJSON.first_appearance_characters &&
                comicJSON.first_appearance_characters.length > 5
              "
              @click="moreFirstCharactersAreHidden = false"
              :class="{ hidden: !moreFirstCharactersAreHidden }"
              class="
                bg-yellow-500
                hover:bg-yellow-700
                text-white
                py-3
                px-4
                rounded
              "
            >
              Show All
            </button>
            <button
              v-if="
                comicJSON.first_appearance_characters &&
                comicJSON.first_appearance_characters.length > 5
              "
              @click="moreFirstCharactersAreHidden = true"
              :class="{ hidden: moreFirstCharactersAreHidden }"
              class="
                bg-yellow-500
                hover:bg-yellow-700
                text-white
                py-3
                px-4
                rounded
              "
            >
              Hide
            </button>
          </div>
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
      moreCharactersAreHidden: true,
      moreFirstCharactersAreHidden: true,
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
      this.moreCharactersAreHidden = true;
      this.moreFirstCharactersAreHidden = true;
    }
  },
  methods: {},
};
</script>

<style scoped>
.spinner[data-v-fa81853e]:after {
  background: #f59e0b;
}

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
</style>