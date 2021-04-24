<template>
  <div>
    <h1 class="uppercase">Movie</h1>
    {{ currentID }}
    {{ movieJSON }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Movie",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      movieJSON: {},
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/movie/${this.currentID}`);
      this.movieJSON = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
