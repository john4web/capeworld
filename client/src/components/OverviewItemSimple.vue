<template>
  <div
    class="text-red-500 border-2 rounded-lg border-red-500 p-2 m-2 w-60 overflow-hidden text-center align-middle"
  >
    <div class="inline-block align-middle">
      <router-link
        :to="`/${dataType}/${id}`"
        class="uppercase text-red-500 hover:text-red-900"
      >
        <h1 class="uppercase">{{ name }}</h1></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "OverviewSimple",
  components: {},
  props: ["dataType", "id", "name"],
  watch: {},

  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>