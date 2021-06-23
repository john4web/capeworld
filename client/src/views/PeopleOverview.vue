<template>
  <div>
    <h1 class="uppercase text-3xl text-red-500 font-bold mb-2 text-center">
      Find a Person
    </h1>
    <div class="text-center">
      <search :dataType="dataType" />
    </div>
    <div v-if="randomPerson" class="mb-10 mt-16">
      <div class="flex justify-center">
        <trending-item
          :dataType="dataType"
          :id="randomPerson.id"
          :name="randomPerson.name"
          :imageURL="randomPerson.image"
          :type="'random'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TrendingItem from "../components/TrendingItem.vue";
import Search from "../components/Search.vue";
export default {
  name: "PeopleOverview",
  components: { TrendingItem, Search },
  data() {
    return {
      dataType: "person",
      randomPerson: null,
    };
  },
  mounted: async function () {
    try {
      const responseRandomPerson = await axios.get(`/api/personrandom`);
      this.randomPerson = responseRandomPerson.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>