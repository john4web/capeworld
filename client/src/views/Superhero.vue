<template>
  <div class="max-w-7xl">
    <h1 class="uppercase text-2xl p-4 bg-red-500 text-white">
      {{ superheroJSON.comicvine_api.name }}
    </h1>

    <div class="flex flex-wrap overflow-hidden">
      <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
        <div class="w-full overflow-hidden flex justify-center mb-10">
          <img
            :src="superheroJSON.comicvine_api.image.medium_url"
            class="max-h-80"
            alt="image"
          />
        </div>
        <table class="">
          <tr>
            <th class="uppercase">Name</th>
            <td>{{ superheroJSON.comicvine_api.name }}</td>
          </tr>

          <tr>
            <th class="uppercase">Real Name</th>
            <td>{{ superheroJSON.comicvine_api.real_name }}</td>
          </tr>
          <tr>
            <th class="uppercase">Aliases</th>

            <td>{{ superheroJSON.comicvine_api.aliases }}</td>
          </tr>
          <tr>
            <th class="uppercase">Place of Birth</th>
            <td>{{ superheroJSON.comicvine_api.birth }}</td>
          </tr>
          <tr>
            <th class="uppercase">First Appearance in Issue</th>
            <td>
              {{ superheroJSON.comicvine_api.first_appeared_in_issue.name }}
            </td>
          </tr>
          <tr>
            <th class="uppercase">Gender</th>
            <td>{{ superheroJSON.comicvine_api.gender }}</td>
          </tr>
          <tr>
            <th class="uppercase">Friends</th>
            <td v-if="superheroJSON.comicvine_api.character_friends.length > 1">
              <p
                v-for="item in superheroJSON.comicvine_api.character_friends"
                :key="item.id"
              >
                <a href=""></a>
                <router-link :to="`/superhero/${item.id}`" target="_blank">
                  {{ item.name }}</router-link
                >
              </p>
            </td>
            <td v-else>
              <a href=""></a>
              <router-link
                :to="`/superhero/${superheroJSON.comicvine_api.character_friends.id}`"
                target="_blank"
              >
                {{
                  superheroJSON.comicvine_api.character_friends.name
                }}</router-link
              >
            </td>
          </tr>
          <tr>
            <th class="uppercase">Enemies</th>
            <td v-if="superheroJSON.comicvine_api.character_enemies.length > 1">
              <p
                v-for="item in superheroJSON.comicvine_api.character_enemies"
                :key="item.id"
              >
                <a href=""></a>
                <router-link :to="`/superhero/${item.id}`" target="_blank">
                  {{ item.name }}</router-link
                >
              </p>
            </td>
            <td v-else>
              <a href=""></a>
              <router-link
                :to="`/superhero/${superheroJSON.comicvine_api.character_enemies.id}`"
                target="_blank"
              >
                {{
                  superheroJSON.comicvine_api.character_enemies.name
                }}</router-link
              >
            </td>
          </tr>
        </table>
      </div>
      <div class="w-fulloverflow-hidden md:w-4/6 p-10">
        <div v-if="superheroJSON.superhero_api">
          <h1 class="text-lg uppercase pb-2">Powerstats</h1>
          <h2>Intelligence</h2>
          <div class="bg-gray-300 w-full">
            <div class="bg-red-500 text-white" :style="widthBarInt">
              {{ superheroJSON.superhero_api.powerstats.intelligence }}
            </div>
          </div>
          <h2>Strength</h2>
          <div class="bg-gray-300 w-full">
            <div class="bg-red-500 text-white" :style="widthBarStr">
              {{ superheroJSON.superhero_api.powerstats.strength }}
            </div>
          </div>
          <h2>Speed</h2>
          <div class="bg-gray-300 w-full">
            <div class="bg-red-500 text-white" :style="widthBarSpeed">
              {{ superheroJSON.superhero_api.powerstats.speed }}
            </div>
          </div>
          <h2>Durability</h2>
          <div class="bg-gray-300 w-full">
            <div class="bg-red-500 text-white" :style="widthBarDur">
              {{ superheroJSON.superhero_api.powerstats.durability }}
            </div>
          </div>
          <h2>Power</h2>
          <div class="bg-gray-300 w-full">
            <div class="bg-red-500 text-white" :style="widthBarPow">
              {{ superheroJSON.superhero_api.powerstats.power }}
            </div>
          </div>
          <h2>Combat</h2>
          <div class="bg-gray-300 w-full">
            <div class="bg-red-500 text-white" :style="widthBarCom">
              {{ superheroJSON.superhero_api.powerstats.combat }}
            </div>
          </div>
        </div>
        <div v-if="superheroJSON.marvel_api">
          <h1 class="text-lg uppercase pb-2">Description</h1>
          {{ superheroJSON.marvel_api.description }}
        </div>
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
    <h1 class="uppercase text-2xl p-4 bg-red-500 text-white">
      Movies about {{ superheroJSON.comicvine_api.name }}
    </h1>
    <div
      v-if="superheroJSON.comicvine_api.movies.length"
      class="grid grid-rows-6 gap-1 grid-flow-col"
    >
      <div v-for="item in superheroJSON.comicvine_api.movies" :key="item.id">
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
    <h1 class="uppercase text-2xl p-4 bg-red-500 text-white">
      Comics about {{ superheroJSON.comicvine_api.name }}
    </h1>
    <div
      v-if="superheroJSON.comicvine_api.issue_credits.length"
      class="grid grid-rows-6 gap-1 grid-flow-col"
    >
      <div
        v-for="item in superheroJSON.comicvine_api.issue_credits"
        :key="item.id"
      >
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
</template>

<script>
import axios from "axios";
import OverviewItem from "../components/OverviewItem.vue";
export default {
  name: "Superhero",
  components: { OverviewItem },
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      superheroName: "",
      superheroJSON: {},
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
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/hero/${this.currentID}`);
      this.superheroJSON = response.data;
      if (this.superheroJSON.superhero_api) {
        this.widthInt = this.superheroJSON.superhero_api.powerstats.intelligence;
        this.widthStr = this.superheroJSON.superhero_api.powerstats.strength;
        this.widthSpeed = this.superheroJSON.superhero_api.powerstats.speed;
        this.widthDur = this.superheroJSON.superhero_api.powerstats.durability;
        this.widthPow = this.superheroJSON.superhero_api.powerstats.power;
        this.widthCom = this.superheroJSON.superhero_api.powerstats.combat;
      }
    } catch (error) {
      console.error(error);
    }
    try {
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
    }
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
</style>
