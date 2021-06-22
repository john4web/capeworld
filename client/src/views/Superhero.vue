<template>
  <div class="w-full md:max-w-7xl">
    <rotate-square2 :class="{ hidden: !showLoader }"></rotate-square2>
    <div :class="{ hidden: showLoader }">
      <div v-if="characterNotFound">Superhero not found!</div>
      <div v-if="!characterNotFound">
        <div class="p-4 bg-red-500 headline">
          <h1
            class="uppercase inline-block text-2xl text-white mt-3"
            v-if="superheroJSON.name"
          >
            {{ superheroJSON.name }}
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
            Character
          </p>
          <div v-if="superheroJSON.biography">
            <p
              v-if="superheroJSON.biography.alignment == 'good'"
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
              Superhero
            </p>
            <p
              v-if="superheroJSON.biography.alignment == 'bad'"
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
              Supervillain
            </p>
          </div>
          <p
            v-else
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
            Minor Character
          </p>
          <div class="publisherLogoContainer" v-if="superheroJSON.publisher">
            <img
              class="publisherLogo"
              v-if="superheroJSON.publisher == 'Marvel'"
              src="../assets/marvel_logo.png"
            />

            <img
              class="publisherLogo"
              v-if="superheroJSON.publisher == 'DC Comics'"
              src="../assets/DC_logo.png"
            />
          </div>
        </div>

        <div class="flex flex-wrap overflow-hidden">
          <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
            <div class="w-full overflow-hidden flex justify-center mb-10">
              <img :src="superheroJSON.image" class="max-h-80" alt="image" />
            </div>
            <table class="profileInfo w-full mr-auto ml-auto">
              <tr v-if="superheroJSON.name">
                <th class="uppercase">Name</th>
                <td>{{ superheroJSON.name }}</td>
              </tr>
              <tr v-if="superheroJSON.real_name">
                <th class="uppercase">Real Name</th>
                <td>{{ superheroJSON.real_name }}</td>
              </tr>
              <tr v-if="superheroJSON.aliases">
                <th class="uppercase">Aliases</th>
                <td>{{ superheroJSON.aliases }}</td>
              </tr>
              <tr
                v-if="
                  superheroJSON.biography &&
                  superheroJSON.biography.place_of_birth
                "
              >
                <th class="uppercase">Place of Birth</th>
                <td>{{ superheroJSON.biography.place_of_birth }}</td>
              </tr>
              <tr v-if="superheroJSON.first_appeared_in_issue">
                <th class="uppercase">First Appearance in Issue</th>
                <td>
                  <router-link
                    :to="`/comic/${superheroJSON.first_appeared_in_issue.id}`"
                  >
                    {{
                      superheroJSON.first_appeared_in_issue.name
                    }}</router-link
                  >
                </td>
              </tr>
              <tr v-if="superheroJSON.gender">
                <th class="uppercase">Gender</th>
                <td>
                  <p>{{ superheroJSON.gender }}</p>
                </td>
              </tr>
            </table>
          </div>
          <div class="w-full overflow-hidden md:w-4/6 p-10 mr-auto ml-auto">
            <div v-if="superheroJSON.powerstats" class="mb-10">
              <h1 class="text-xl uppercase pb-2">Powerstats</h1>
              <h3 class="p-0 m-0">Intelligence</h3>
              <div class="meter bg-gray-300">
                <span :style="widthBarInt">
                  <span class="progress bg-red-500 text-white">{{
                    superheroJSON.powerstats.intelligence
                  }}</span></span
                >
              </div>
              <h3 class="p-0 m-0">Strength</h3>
              <div class="meter bg-gray-300">
                <span :style="widthBarStr">
                  <span class="progress bg-red-500 text-white">{{
                    superheroJSON.powerstats.strength
                  }}</span></span
                >
              </div>
              <h3 class="p-0 m-0">Speed</h3>
              <div class="meter bg-gray-300">
                <span :style="widthBarSpeed">
                  <span class="progress bg-red-500 text-white">{{
                    superheroJSON.powerstats.speed
                  }}</span></span
                >
              </div>
              <h3 class="p-0 m-0">Durability</h3>
              <div class="meter bg-gray-300">
                <span :style="widthBarDur">
                  <span class="progress bg-red-500 text-white">{{
                    superheroJSON.powerstats.durability
                  }}</span></span
                >
              </div>
              <h3 class="p-0 m-0">Power</h3>
              <div class="meter bg-gray-300">
                <span :style="widthBarPow">
                  <span class="progress bg-red-500 text-white">{{
                    superheroJSON.powerstats.power
                  }}</span></span
                >
              </div>
              <h3 class="p-0 m-0">Combat</h3>
              <div class="meter bg-gray-300">
                <span :style="widthBarCom">
                  <span class="progress bg-red-500 text-white">{{
                    superheroJSON.powerstats.combat
                  }}</span></span
                >
              </div>
            </div>
            <div v-if="superheroJSON.appearance" class="mb-10">
              <h1
                v-if="superheroJSON.appearance"
                class="text-xl uppercase pb-2"
              >
                Appearance
              </h1>
              <table class="appearance" style="width: 100%">
                <tr>
                  <th v-if="superheroJSON.appearance.eye_color">Eye Color</th>
                  <th v-if="superheroJSON.appearance.hair_color">Hair Color</th>
                  <th v-if="superheroJSON.appearance.height">Height</th>
                  <th v-if="superheroJSON.appearance.weight">Weight</th>
                  <th v-if="superheroJSON.appearance.race">Race</th>
                </tr>
                <tr>
                  <td v-if="superheroJSON.appearance.eye_color">
                    {{ superheroJSON.appearance.eye_color }}
                  </td>
                  <td v-if="superheroJSON.appearance.hair_color">
                    {{ superheroJSON.appearance.hair_color }}
                  </td>
                  <td v-if="superheroJSON.appearance.height">
                    {{ superheroJSON.appearance.height[1] }}
                  </td>
                  <td v-if="superheroJSON.appearance.weight">
                    {{ superheroJSON.appearance.weight[1] }}
                  </td>
                  <td v-if="superheroJSON.appearance.race">
                    {{ superheroJSON.appearance.race }}
                  </td>
                </tr>
              </table>
            </div>
            <div class="mb-10">
              <h1
                v-if="superheroJSON.character_friends"
                class="text-xl uppercase pb-2"
              >
                Friends
              </h1>
              <div
                class="flex flex-wrap"
                v-if="superheroJSON.character_friends"
              >
                <div
                  class="
                    text-green-500
                    border-2
                    rounded-lg
                    border-green-500
                    p-2
                    m-2
                  "
                  :class="{ hidden: !moreFriendsAreHidden }"
                  v-for="item in superheroJSON.character_friends.slice(0, 5)"
                  :key="item.id"
                >
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </div>
                <div
                  class="
                    text-green-500
                    border-2
                    rounded-lg
                    border-green-500
                    p-2
                    m-2
                  "
                  :class="{ hidden: moreFriendsAreHidden }"
                  v-for="item in superheroJSON.character_friends"
                  :key="item.id + 'more_friends'"
                >
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </div>
              </div>
              <div
                class="
                  text-green-500
                  border-2
                  rounded-lg
                  border-green-500
                  p-2
                  m-2
                "
                :class="{ hidden: moreFriendsAreHidden }"
                v-else
              >
                <router-link
                  :to="`/superhero/${superheroJSON.character_friends.id}`"
                  v-if="superheroJSON.character_friends"
                >
                  {{ superheroJSON.character_friends.name }}</router-link
                >
              </div>
              <button
                v-if="
                  superheroJSON.character_friends &&
                  superheroJSON.character_friends.length > 5
                "
                @click="moreFriendsAreHidden = false"
                :class="{ hidden: !moreFriendsAreHidden }"
                class="
                  bg-green-500
                  hover:bg-green-700
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
                  superheroJSON.character_friends &&
                  superheroJSON.character_friends.length > 5
                "
                @click="moreFriendsAreHidden = true"
                :class="{ hidden: moreFriendsAreHidden }"
                class="
                  bg-green-500
                  hover:bg-green-700
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
              <h1
                v-if="superheroJSON.character_enemies"
                class="text-xl uppercase pb-2"
              >
                Enemies
              </h1>
              <div
                class="flex flex-wrap"
                v-if="superheroJSON.character_enemies"
              >
                <div
                  class="
                    text-red-500
                    border-2
                    rounded-lg
                    border-red-500
                    p-2
                    m-2
                  "
                  :class="{ hidden: !moreEnemiesAreHidden }"
                  v-for="item in superheroJSON.character_enemies.slice(0, 5)"
                  :key="item.id"
                >
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </div>
                <div
                  class="
                    text-red-500
                    border-2
                    rounded-lg
                    border-red-500
                    p-2
                    m-2
                  "
                  :class="{ hidden: moreEnemiesAreHidden }"
                  v-for="item in superheroJSON.character_enemies"
                  :key="item.id + 'more_enemies'"
                >
                  <router-link :to="`/superhero/${item.id}`">
                    {{ item.name }}</router-link
                  >
                </div>
              </div>
              <div
                class="text-red-500 border-2 rounded-lg border-red-500 p-2 m-2"
                :class="{ hidden: moreEnemiesAreHidden }"
                v-else
              >
                <router-link
                  :to="`/superhero/${superheroJSON.character_enemies.id}`"
                  v-if="superheroJSON.character_enemies"
                >
                  {{ superheroJSON.character_enemies.name }}</router-link
                >
              </div>
              <button
                v-if="
                  superheroJSON.character_enemies &&
                  superheroJSON.character_enemies.length > 5
                "
                @click="moreEnemiesAreHidden = false"
                :class="{ hidden: !moreEnemiesAreHidden }"
                class="bg-red-500 hover:bg-red-700 text-white py-3 px-4 rounded"
              >
                Show All
              </button>
              <button
                v-if="
                  superheroJSON.character_enemies &&
                  superheroJSON.character_enemies.length > 5
                "
                @click="moreEnemiesAreHidden = true"
                :class="{ hidden: moreEnemiesAreHidden }"
                class="bg-red-500 hover:bg-red-700 text-white py-3 px-4 rounded"
              >
                Hide
              </button>
            </div>

            <div>
              <h1
                class="text-xl uppercase pb-4"
                v-if="superheroJSON.description_short"
              >
                Description Short
              </h1>
              <div class="mb-10">
                {{ superheroJSON.description_short }}
              </div>
            </div>
            <h1 class="text-xl uppercase pb-4" v-if="description">
              More Information
            </h1>
            <div v-if="description">
              <p
                v-if="description.length <= 10000"
                class="pb-4 htmlContent"
                v-html="description"
              ></p>
              <div v-else>
                <p class="htmlContent" v-html="description.substr(0, 10000)">
                  ...
                </p>
                <p
                  class="pb-4 htmlContent"
                  :class="{ hidden: moreTextHidden }"
                  v-html="description.substr(10000, 10000000)"
                ></p>
                <button
                  @click="moreTextHidden = false"
                  :class="{ hidden: !moreTextHidden }"
                  class="
                    bg-red-500
                    hover:bg-red-700
                    text-white
                    py-3
                    px-4
                    rounded
                  "
                >
                  Read More
                </button>
                <button
                  @click="moreTextHidden = true"
                  :class="{ hidden: moreTextHidden }"
                  class="
                    bg-red-500
                    hover:bg-red-700
                    text-white
                    py-3
                    px-4
                    rounded
                  "
                >
                  Show Less
                </button>
              </div>
            </div>
            <p v-if="!description && !superheroJSON.description_short">
              Sorry, there is no further information available for this
              character!
            </p>
          </div>
        </div>
        <h1
          v-if="superheroJSON.name"
          class="uppercase text-2xl p-4 bg-red-500 text-white"
        >
          Movies about {{ superheroJSON.name }}
        </h1>
        <h1 v-else class="uppercase text-2xl p-4 bg-red-500 text-white">
          Movies about this character
        </h1>
        <div
          v-if="superheroJSON.movies"
          class="overview-cols mr-auto ml-auto mb-10"
        >
          <div
            class="flex justify-center"
            v-for="item in superheroJSON.movies"
            :key="item.id"
          >
            <overview-item-simple
              :dataType="dataTypeMovie"
              :id="item.id"
              :name="item.name"
            />
          </div>
        </div>
        <div v-else>
          <h2 class="uppercase text-xl p-4">
            No movies about this character found
          </h2>
        </div>
        <h1
          v-if="superheroJSON.name"
          class="uppercase text-2xl p-4 bg-red-500 text-white"
        >
          Comics about {{ superheroJSON.name }}
        </h1>
        <h1 v-else class="uppercase text-2xl p-4 bg-red-500 text-white">
          Comics about this character
        </h1>
        <div
          v-if="superheroJSON.issue_credits"
          class="overview-cols mr-auto ml-auto mb-10"
        >
          <div
            class="flex justify-center"
            v-for="item in superheroJSON.issue_credits"
            :key="item.id"
          >
            <overview-item-simple
              :dataType="dataTypeComic"
              :id="item.id"
              :name="item.name"
            />
          </div>
        </div>
        <div v-else>
          <h2 class="uppercase text-xl p-4">
            No comics about this character found
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OverviewItemSimple from "../components/OverviewItemSimple.vue";
import { RotateSquare2 } from "vue-loading-spinner";
export default {
  name: "Superhero",
  components: { OverviewItemSimple, RotateSquare2 },
  props: {},
  watch: {
    "$route.path"() {
      this.requestPageContent(this.$route.params.id);
    },
  },
  data() {
    return {
      superheroJSON: {
        name: "",
      },
      moviesJSON: {},
      comicsJSON: {},
      dataTypeMovie: "movie",
      dataTypeComic: "comic",
      widthInt: "",
      widthStr: "",
      widthSpeed: "",
      widthDur: "",
      widthPow: "",
      widthCom: "",
      showLoader: true,
      description: "",
      moreFriendsAreHidden: true,
      moreEnemiesAreHidden: true,
      moreTextHidden: true,
      characterNotFound: false,
    };
  },

  mounted: function () {
    this.requestPageContent(this.$route.params.id);
  },

  methods: {
    async requestPageContent(heroID) {
      this.characterNotFound = false;
      try {
        this.showLoader = true;
        const response = await axios.get(`/api/hero/${heroID}`);
        this.superheroJSON = response.data;
        if ("notFound" in this.superheroJSON) {
          this.characterNotFound = true;
        } else {
          this.description = this.superheroJSON.description;
          if (this.superheroJSON.powerstats) {
            this.widthInt = this.superheroJSON.powerstats.intelligence;
            this.widthStr = this.superheroJSON.powerstats.strength;
            this.widthSpeed = this.superheroJSON.powerstats.speed;
            this.widthDur = this.superheroJSON.powerstats.durability;
            this.widthPow = this.superheroJSON.powerstats.power;
            this.widthCom = this.superheroJSON.powerstats.combat;
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoader = false;
        this.moreFriendsAreHidden = true;
        this.moreEnemiesAreHidden = true;
        this.moreTextHidden = true;
      }
    },
  },

  computed: {
    widthBarInt() {
      return {
        width: `${this.widthInt}%`,
      };
    },
    widthBarSpeed() {
      return {
        width: `${this.widthSpeed}%`,
      };
    },
    widthBarStr() {
      return {
        width: `${this.widthStr}%`,
      };
    },
    widthBarDur() {
      return {
        width: `${this.widthDur}%`,
      };
    },
    widthBarPow() {
      return {
        width: `${this.widthPow}%`,
      };
    },
    widthBarCom() {
      return {
        width: `${this.widthCom}%`,
      };
    },
  },
};
</script>

<style scoped>
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

.spinner[data-v-fa81853e]:after {
  @apply bg-red-500;
}

.spinner {
  margin-top: 20px;
  margin-left: 50%;
}
.meter {
  height: 25px;
  position: relative;
  overflow: hidden;
}

.meter span {
  display: block;
  height: 100%;
}

.progress {
  animation: progressBar 3s ease-in-out;
  animation-fill-mode: both;
}

@keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.headline {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
@media (min-width: 768px) {
  .headline {
    grid-template-columns: repeat(4, 1fr);
    grid-template-columns: 65% 15% 15% 5%;
  }
}
.publisherLogo {
  width: 50px;
}
.publisherLogoContainer {
  display: block;
  margin: auto;
}

.appearance td,
th {
  width: 20%;
  text-align: center;
}
table a {
  @apply text-red-900;
}
table a:hover {
  @apply text-red-700;
}
</style>

