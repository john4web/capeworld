<template>
  <div>
    <div class="flex flex-wrap" v-if="data" :class="color">
      <div
        class="colorDiv"
        :class="{ hidden: !itemsHidden }"
        v-for="item in data.slice(0, 5)"
        :key="item.id"
      >
        <router-link :to="`/${dataType}/${item.id}`">
          {{ item.name }}</router-link
        >
      </div>
      <div
        class="colorDiv"
        :class="{ hidden: itemsHidden }"
        v-for="item in data"
        :key="item.id + 'more_items'"
      >
        <router-link :to="`/${dataType}/${item.id}`">
          {{ item.name }}</router-link
        >
      </div>
    </div>
    <div class="colorDiv" :class="{ hidden: itemsHidden }" v-else>
      <router-link :to="`/${dataType}/${data.id}`" v-if="data">
        {{ data.name }}</router-link
      >
    </div>
    <div :class="color">
      <button
        v-if="data && data.length > 5"
        @click="itemsHidden = false"
        :class="{ hidden: !itemsHidden }"
        class="text-white py-3 px-4 rounded"
      >
        Show All
      </button>
      <button
        v-if="data && data.length > 5"
        @click="itemsHidden = true"
        :class="{ hidden: itemsHidden }"
        class="text-white py-3 px-4 rounded"
      >
        Hide
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterList",
  props: ["dataType", "data", "color"],
  data() {
    return {
      itemsHidden: "true",
    };
  },
};
</script>

<style scoped>
.yellow button {
  @apply bg-yellow-500 hover:bg-yellow-700;
}
.yellow .colorDiv {
  @apply text-yellow-500 border-2 rounded-lg border-yellow-500 p-2 m-2;
}

.red button {
  @apply bg-red-500 hover:bg-red-700;
}
.red .colorDiv {
  @apply text-red-500 border-2 rounded-lg border-red-500 p-2 m-2;
}

.blue button {
  @apply bg-blue-500 hover:bg-blue-700;
}
.blue .colorDiv {
  @apply text-blue-500 border-2 rounded-lg border-blue-500 p-2 m-2;
}

.green button {
  @apply bg-green-500 hover:bg-green-700;
}
.green .colorDiv {
  @apply text-green-500 border-2 rounded-lg border-green-500 p-2 m-2;
}
</style>