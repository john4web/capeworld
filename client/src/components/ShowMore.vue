<template>
  <div v-if="data" :class="color">
    <p v-if="data.length <= 10000" class="pb-4 htmlContent" v-html="data"></p>
    <div v-else>
      <p class="htmlContent" v-html="data.substr(0, 10000)">...</p>
      <p
        class="pb-4 htmlContent"
        :class="{ hidden: moreTextHidden }"
        v-html="data.substr(10000, 10000000)"
      ></p>
      <button
        @click="moreTextHidden = false"
        :class="{ hidden: !moreTextHidden }"
        class="text-white py-3 px-4 rounded"
      >
        Read More
      </button>
      <button
        @click="moreTextHidden = true"
        :class="{ hidden: moreTextHidden }"
        class="text-white py-3 px-4 rounded"
      >
        Show Less
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowMore",
  props: ["data", "color"],
  data() {
    return {
      moreTextHidden: "true",
    };
  },
};
</script>

<style scoped>
.yellow button {
  @apply bg-yellow-500 hover:bg-yellow-700;
}
.red button {
  @apply bg-red-500 hover:bg-red-700;
}
.blue button {
  @apply bg-blue-500 hover:bg-blue-700;
}
.green button {
  @apply bg-green-500 hover:bg-green-700;
}
</style>