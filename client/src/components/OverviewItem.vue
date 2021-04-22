<template>
  <div
    class="m-4 p-4 shadow-md border bg-white w-60 text-gray-700 overflow-hidden"
  >
    <div class="inline-block">
      <router-link
        to="/superhero/100"
        class="uppercase text-gray-900 hover:text-red-500"
      >
        <h1 class="uppercase">Overview Item</h1></router-link
      >
      <p class="mt-2 text-sm">Short Info Text</p>
    </div>
    <div class="float-left justify-center overflow-hidden inline-block mr-4">
      <img src="../assets/cape.svg" class="max-w-xs max-h-7" alt="thumbnail" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Overview",
  components: {},
  props: {},
  watch: {},

  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>