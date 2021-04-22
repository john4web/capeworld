<template>
  <div>
    <h1 class="uppercase">Movies Overview</h1>
    <div class="grid grid-rows-4 gap-1 grid-flow-col">
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
      <overview-item />
    </div>
  </div>
</template>

<script>
import OverviewItem from "../components/OverviewItem.vue";
export default {
  name: "MoviesOverview",
  components: { OverviewItem },
  props: {},
  watch: {},

  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
