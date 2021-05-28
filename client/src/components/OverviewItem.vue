<template>
  <div
    class="m-4 p-4 shadow-md border bg-white w-60 text-gray-700 overflow-hidden"
  >
    <div class="inline-block">
      <router-link
        :to="`/${dataType}/${id}`"
        class="uppercase text-gray-900 hover:text-red-500"
      >
        <h1 class="uppercase">{{ name }}</h1></router-link
      >
      <p class="mt-2 text-sm">{{ id }}</p>
      <img :src="imageURL" alt="" />
    </div>
    <!-- <div class="float-left justify-center overflow-hidden inline-block mr-4">
      <img :src="imageURL" class="max-w-xs max-h-7" alt="thumbnail" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Overview",
  components: {},
  props: ["dataType", "id", "name", "imageURL"],
  watch: {},

  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>