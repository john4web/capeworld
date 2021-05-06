<template>
  <div class="max-w-7xl">
    <rotate-square2 :class="{ hidden: isHiddenLoader }"></rotate-square2>
    <div :class="{ hidden: isHiddenContent }">
      <h1
        class="uppercase text-2xl p-4 bg-red-500 text-white"
        v-if="superheroJSON.name"
      >
        {{ superheroJSON.name }}
      </h1>

      <div class="flex flex-wrap overflow-hidden">
        <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
          <div class="w-full overflow-hidden flex justify-center mb-10">
            <img :src="superheroJSON.image" class="max-h-80" alt="image" />
          </div>
          <table class="profileInfo">
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
            <tr v-if="superheroJSON.birth">
              <th class="uppercase">Place of Birth</th>
              <td>{{ superheroJSON.birth }}</td>
            </tr>
            <tr v-if="superheroJSON.first_appeared_in_issue">
              <th class="uppercase">First Appearance in Issue</th>
              <td v-if="superheroJSON.first_appeared_in_issue !== undefined">
                {{ superheroJSON.first_appeared_in_issue.name }}
              </td>
            </tr>
            <tr v-if="superheroJSON.gender">
              <th class="uppercase">Gender</th>
              <td v-if="superheroJSON.gender == 1">
                <p>Male</p>
              </td>
              <td v-if="superheroJSON.gender == 2">
                <p>Female</p>
              </td>
            </tr>
          </table>
        </div>
        <div class="w-fulloverflow-hidden md:w-4/6 p-10">
          <div v-if="superheroJSON.powerstats" class="mb-10">
            <h1 class="text-lg uppercase pb-2">Powerstats</h1>
            <h2>Intelligence</h2>
            <div class="meter bg-gray-300">
              <span :style="widthBarInt">
                <span class="progress bg-red-500 text-white">{{
                  superheroJSON.powerstats.intelligence
                }}</span></span
              >
            </div>
            <h2>Strength</h2>
            <div class="meter bg-gray-300">
              <span :style="widthBarStr">
                <span class="progress bg-red-500 text-white">{{
                  superheroJSON.powerstats.strength
                }}</span></span
              >
            </div>
            <h2>Speed</h2>
            <div class="meter bg-gray-300">
              <span :style="widthBarSpeed">
                <span class="progress bg-red-500 text-white">{{
                  superheroJSON.powerstats.speed
                }}</span></span
              >
            </div>
            <h2>Durability</h2>
            <div class="meter bg-gray-300">
              <span :style="widthBarDur">
                <span class="progress bg-red-500 text-white">{{
                  superheroJSON.powerstats.durability
                }}</span></span
              >
            </div>
            <h2>Power</h2>
            <div class="meter bg-gray-300">
              <span :style="widthBarPow">
                <span class="progress bg-red-500 text-white">{{
                  superheroJSON.powerstats.power
                }}</span></span
              >
            </div>
            <h2>Combat</h2>
            <div class="meter bg-gray-300">
              <span :style="widthBarCom">
                <span class="progress bg-red-500 text-white">{{
                  superheroJSON.powerstats.combat
                }}</span></span
              >
            </div>
          </div>

          <div class="mb-10">
            <h2 class="uppercase">Friends</h2>
            <div class="flex flex-wrap" v-if="superheroJSON.character_friends">
              <div
                class="text-green-500 border-2 rounded-lg border-green-500 p-2 m-2"
                v-for="item in superheroJSON.character_friends"
                :key="item.id"
                @click="reloadPage()"
              >
                <router-link :to="`/superhero/${item.id}`">
                  {{ item.name }}</router-link
                >
              </div>
            </div>
            <div
              class="text-green-500 border-2 rounded-lg border-green-500 p-2 m-2"
              v-else
              @click="reloadPage()"
            >
              <router-link
                :to="`/superhero/${superheroJSON.character_friends.id}`"
                v-if="superheroJSON.character_friends !== undefined"
                @click="reloadPage()"
              >
                {{ superheroJSON.character_friends.name }}</router-link
              >
            </div>
          </div>

          <div class="mb-10">
            <h2 class="uppercase">Enemies</h2>
            <div class="flex flex-wrap" v-if="superheroJSON.character_enemies">
              <div
                class="text-red-500 border-2 rounded-lg border-red-500 p-2 m-2"
                v-for="item in superheroJSON.character_enemies"
                :key="item.id"
                @click="reloadPage()"
              >
                <router-link :to="`/superhero/${item.id}`">
                  {{ item.name }}</router-link
                >
              </div>
            </div>
            <div
              class="text-red-500 border-2 rounded-lg border-red-500 p-2 m-2"
              v-else
              @click="reloadPage()"
            >
              <router-link
                :to="`/superhero/${superheroJSON.character_enemies.id}`"
                v-if="superheroJSON.character_enemies !== undefined"
              >
                {{ superheroJSON.character_enemies.name }}</router-link
              >
            </div>
          </div>

          <div>
            <h1
              v-if="superheroJSON.description_short"
              class="text-lg uppercase pb-2"
            >
              Description Short
            </h1>
            <div class="mb-10">
              {{ superheroJSON.description_short }}
            </div>
          </div>
          <h1 v-if="description" class="text-lg uppercase pb-2">
            More Information
          </h1>
          <p class="pb-4" v-html="description"></p>
          <p v-if="!description && !superheroJSON.description_short">
            Sorry, there is no further information available for this chaarcter!
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
        class="grid gap-1 grid-flow-col"
        :class="{
          'grid-rows-3': rows3,
          'grid-rows-6': rows6,
          'grid-rows-10': rows10,
        }"
      >
        <div v-for="item in superheroJSON.movies" :key="item.id">
          <overview-item
            :dataType="dataTypeMovie"
            :id="item.id"
            :name="item.name"
          />
        </div>
      </div>
      <div v-else>
        <h2 class="uppercase text-2xl p-4">
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
        class="grid grid-rows-6 gap-1 grid-flow-col"
        :class="{
          'grid-rows-6': rows6Comic,
          'grid-rows-10': rows10Comic,
        }"
      >
        <div v-for="item in superheroJSON.issue_credits" :key="item.id">
          <overview-item
            :dataType="dataTypeComic"
            :id="item.id"
            :name="item.name"
          />
        </div>
      </div>
      <div v-else>
        <h2 class="uppercase text-2xl p-4">
          No comics about this character found
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OverviewItem from "../components/OverviewItem.vue";
import { RotateSquare2 } from "vue-loading-spinner";
export default {
  name: "Superhero",
  components: { OverviewItem, RotateSquare2 },
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      superheroName: "",
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
      isHiddenLoader: false,
      isHiddenContent: true,
      description: "",
      rows10: false,
      rows6: false,
      rows3: true,
      rows10Comic: false,
      rows6Comic: true,
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/hero/${this.currentID}`);
      this.isHiddenLoader = true;
      this.isHiddenContent = false;
      this.superheroJSON = response.data;
      this.description = this.superheroJSON.description;
      if (this.superheroJSON.powerstats) {
        this.widthInt = this.superheroJSON.powerstats.intelligence;
        this.widthStr = this.superheroJSON.powerstats.strength;
        this.widthSpeed = this.superheroJSON.powerstats.speed;
        this.widthDur = this.superheroJSON.powerstats.durability;
        this.widthPow = this.superheroJSON.powerstats.power;
        this.widthCom = this.superheroJSON.powerstats.combat;
      }
      if (this.superheroJSON.issue_credits.length > 24) {
        this.rows10Comic = true;
        this.rows6Comic = false;
      } else {
        this.rows10Comic = false;
        this.rows6Comic = true;
      }
      if (this.superheroJSON.movies.length > 24) {
        this.rows10 = true;
        this.rows6 = false;
        this.rows3 = false;
      } else if (
        this.superheroJSON.movies.length > 12 &&
        this.superheroJSON.movies.length <= 24
      ) {
        this.rows10 = false;
        this.rows6 = true;
        this.rows3 = false;
      } else {
        this.rows10 = false;
        this.rows6 = false;
        this.rows3 = true;
      }
    } catch (error) {
      console.error(error);
    }
    /*try {
      const responseMovie = await axios.get(
        `/api/movie/name/${this.superheroName}`
      );
      this.moviesJSON = responseMovie.data;
    } catch (error) {
      console.error(error);
    }
    try {
      const responseComic = await axios.get(
        `/api/comic/name/${this.superheroName}`
      );
      this.comicsJSON = responseComic.data;
    } catch (error) {
      console.error(error);
    }*/
  },

  methods: {
    reloadPage() {
      location.reload();
      return false;
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
  background: rgba(239, 68, 68);
}

.spinner {
  margin-top: 20px;
  margin-left: 50%;
}
.grid-rows-10 {
  grid-template-rows: repeat(10, minmax(0, 1fr));
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
</style>
