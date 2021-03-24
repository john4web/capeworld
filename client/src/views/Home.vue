<template>
  <div>
    <div>{{ output.username }}</div>
    <div>{{ output.subject }}</div>
    <div>{{ output.message }}</div>
  </div>
</template>



<script>
const API_URL = "http://localhost:4000/testCollection";

export default {
  name: "home",
  data: () => ({
    error: "",
    output: [],
  }),

  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.output = result[0];
      });
  },
  methods: {},
};
</script>

<style>
</style>