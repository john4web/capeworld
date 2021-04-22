<template>
  <div>
    <h1 class="uppercase">Home</h1>
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
const axios = require("axios");
import OverviewItem from "../components/OverviewItem.vue";
export default {
  name: "Home",
  components: { OverviewItem },
  // data: () => ({
  //   error: "",
  //   output: [],
  // }),

  // mounted() {
  //   fetch(API_URL)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //     });
  //   // axios
  //   //   .post(API_URL, {
  //   //     firstName: "Johannes",
  //   //     lastName: "Gerstbauer",
  //   //     email: "test@example.com",
  //   //     company: "FH-HGB",
  //   //     phone: "12345678",
  //   //   })
  //   //   .then(function (response) {
  //   //     console.log(response);
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  // },
  // methods: {},
  mounted() {
    axios
      .get("/api/hero/1")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style></style>
