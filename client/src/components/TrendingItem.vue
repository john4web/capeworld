<template>
  <div class="flex flex-row items-stretch mt-0">
    <div class="ml-0 overview-image-container mr-4">
      <div
        class="overview-image-container"
        :style="{ backgroundImage: 'url(' + imageURL + ')' }"
      ></div>
    </div>
    <div class="overview-text-container mr-0 bg-white p-8">
      <p v-if="trending" class="uppercase text-3xl text-red-500 font-bold mb-2">
        Trending {{ dataType }}
      </p>
      <p v-else class="uppercase text-3xl text-red-500 font-bold mb-2">
        Random {{ dataType }}
      </p>
      <router-link
        :to="`/${dataType}/${id}`"
        class="uppercase text-gray-900 hover:text-red-500"
      >
        <h1 class="uppercase text-xl mb-2">{{ name }}</h1></router-link
      >
      <router-link
        :to="`/${dataType}/${id}`"
        class="uppercase text-gray-900 hover:text-red-500"
      >
        <button
          class="bg-red-500 hover:bg-red-700 text-white uppercase py-2 px-4 rounded"
        >
          Read More
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Trending",
  components: {},
  props: ["dataType", "id", "name", "imageURL", "trending"],
  watch: {},

  mounted() {},
  methods: {},
};
</script>

<style scoped>
.overview-image-container {
  width: 500px;
  height: 300px;
  background-position-y: 50%;
}

.overview-text-container {
  width: 400px;
  height: 300px;
}
</style>