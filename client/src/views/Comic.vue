<template>
  <div>
    <h1 class="uppercase">Comic</h1>
    {{ currentID }}
    {{ comicJSON }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comic",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      comicJSON: {},
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/comic/${this.currentID}`);
      this.comicJSON = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
