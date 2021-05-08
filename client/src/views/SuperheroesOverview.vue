<template>
  <div>
    <h1 class="uppercase">Superheroes Overview</h1>
    <search :dataType="dataType" />
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  name: "SuperheroesOverview",
  components: { Search },
  props: {},
  watch: {},
  data() {
    return {
      dataType: "superhero",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
