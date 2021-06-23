<template>
  <div class="w-full md:max-w-7xl">
    <rotate-square2 :class="{ hidden: !showLoader }"></rotate-square2>
    <div :class="{ hidden: showLoader }">
      <div v-if="personNotFound">Person not found!</div>
      <div v-if="!personNotFound">
        <div class="p-4 bg-blue-500 headline" v-if="person">
          <h1 class="uppercase inline-block text-2xl text-white mt-3">
            {{ person.name }}
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
            Person
          </p>
        </div>
        <div class="flex flex-wrap overflow-hidden" v-if="person">
          <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
            <div class="w-full overflow-hidden flex justify-center mb-10">
              <div>
                <div>
                  <img :src="person.image" class="max-h-80" alt="image" />
                </div>
              </div>
            </div>
            <table class="profileInfo w-full mr-auto ml-auto">
              <tr v-if="person.name">
                <th class="uppercase">Name</th>
                <td>{{ person.name }}</td>
              </tr>
              <tr v-if="person.gender">
                <th class="uppercase">Gender</th>
                <td>
                  <p>{{ person.gender }}</p>
                </td>
              </tr>
              <tr v-if="person.aliases">
                <th class="uppercase">Aliases</th>
                <td>{{ person.aliases }}</td>
              </tr>
              <tr v-if="person.website">
                <th class="uppercase">Website</th>
                <td>
                  <a
                    class="website"
                    :href="person.website"
                    rel="noopener noreferrer"
                    target="_blank"
                    >{{ person.website }}</a
                  >
                </td>
              </tr>
              <tr v-if="person.email">
                <th class="uppercase">Email address</th>
                <td>{{ person.email }}</td>
              </tr>
              <tr v-if="person.birth">
                <th class="uppercase">Birth date</th>
                <td>{{ person.birth.substr(0, person.birth.indexOf(" ")) }}</td>
              </tr>
              <tr v-if="person.death">
                <th class="uppercase">Death date</th>
                <td>
                  {{
                    person.death.date.substr(0, person.death.date.indexOf(" "))
                  }}
                </td>
              </tr>
              <tr v-if="person.death">
                <th class="uppercase">Death place</th>
                <td>{{ person.death.timezone }}</td>
              </tr>
              <tr v-if="person.hometown">
                <th class="uppercase">Hometown</th>
                <td>{{ person.hometown }}</td>
              </tr>
              <tr v-if="person.country">
                <th class="uppercase">Country</th>
                <td>{{ person.country }}</td>
              </tr>
            </table>
          </div>
          <div class="w-full overflow-hidden md:w-4/6 p-10 mr-auto ml-auto">
            <div class="mb-10" v-if="characters">
              <h2 v-if="person.name" class="text-lg uppercase pb-2">
                Characters created by {{ person.name }}
              </h2>
              <h2 v-else class="text-lg uppercase pb-2">
                Characters created by this person
              </h2>
              <div v-if="characters">
                <character-list
                  :dataType="dataTypeHero"
                  :data="characters"
                  :color="color"
                />
              </div>
            </div>
            <h1 v-if="person.deck" class="text-lg uppercase pb-2">Deck</h1>
            <p v-if="person.deck" class="pb-4" v-html="person.deck"></p>

            <h1 class="text-lg uppercase pb-2">Description</h1>
            <div v-if="person.description">
              <show-more :data="person.description" :color="color" />
            </div>
            <p v-else>No additional information about the person available</p>
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
  name: "person",
  components: { RotateSquare2, CharacterList, ShowMore },
  data() {
    return {
      currentID: this.$route.params.id,
      person: null,
      issues: null,
      characters: null,
      showLoader: true,
      personNotFound: false,
      dataTypeHero: "superhero",
      color: "blue",
    };
  },

  mounted: async function () {
    this.personNotFound = false;
    try {
      this.showLoader = true;
      const response = await axios.get(`/api/person/${this.currentID}`);
      this.person = response.data;
      if ("notFound" in this.person) {
        this.personNotFound = true;
      }
      this.issues = response.data.issues;
      this.characters = response.data.created_characters;
    } catch (error) {
      console.error(error);
    } finally {
      this.showLoader = false;
    }
  },
};
</script>

<style scoped>
.spinner[data-v-fa81853e]:after {
  @apply bg-blue-500;
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
table a {
  @apply text-blue-900;
}
table a:hover {
  @apply text-blue-700;
}

.website {
  word-break: break-all;
}
</style>

