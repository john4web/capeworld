<template>
  <div class="max-w-7xl">
    <h1 class="uppercase text-2xl p-4 bg-red-500 text-white">Wonder Woman</h1>
    <div class="flex flex-wrap overflow-hidden">
      <div class="w-full overflow-hidden md:w-2/6 bg-gray-300 p-10">
        <div class="w-full overflow-hidden flex justify-center mb-10">
          <img
            src="https://www.superherodb.com/pictures2/portraits/10/100/807.jpg"
            class="max-h-80"
            alt="image"
          />
        </div>
        <table class="">
          <tr>
            <th class="uppercase">Name</th>
            <td>Wonder Woman</td>
          </tr>
          <tr>
            <th class="uppercase">Full Name</th>
            <td>Diana Prince</td>
          </tr>
          <tr>
            <th class="uppercase">Place of Birth</th>
            <td>Themyscira</td>
          </tr>
          <tr>
            <th class="uppercase">First appearance</th>
            <td>All-Star Comics #8 (December, 1941)</td>
          </tr>
          <tr>
            <th class="uppercase">Publisher</th>
            <td>DC Comics</td>
          </tr>
          <tr>
            <th class="uppercase">Gender</th>
            <td>Female</td>
          </tr>
          <tr>
            <th class="uppercase">Race</th>
            <td>Amazon</td>
          </tr>
          <tr>
            <th class="uppercase">Weight</th>
            <td>183 cm</td>
          </tr>
          <tr>
            <th class="uppercase">Height</th>
            <td>74 kg</td>
          </tr>
        </table>
      </div>
      <div class="w-fulloverflow-hidden md:w-4/6 p-10">
        <h1 class="text-lg uppercase pb-2">More Information</h1>
        <p class="pb-4">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <h1 class="text-lg uppercase pb-2">More Information</h1>
        <p class="pb-4">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <h1 class="text-lg uppercase pb-2">More Information</h1>
        <p class="pb-4">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
    {{ currentID }}
    {{ superheroJSON }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Superhero",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      currentID: this.$route.params.id,
      superheroJSON: {},
    };
  },

  mounted: async function () {
    try {
      const response = await axios.get(`/api/hero/${this.currentID}`);
      this.superheroJSON = response.data;
    } catch (error) {
      console.error(error);
    }
  },

  methods: {},
};
</script>

<style scoped>
th {
  padding: 10px;
  text-align: left;
  width: 50%;
  border-bottom: solid 1px white;
  @apply bg-gray-900;
  @apply text-white;
}
td {
  width: 50%;
  padding: 10px;
  text-align: right;
  border-bottom: solid 1px white;
  @apply bg-gray-400;
  @apply text-gray-900;
}
table > tr:last-child > td {
  border-bottom: 0 !important;
}
table > tr:last-child > th {
  border-bottom: 0 !important;
}
</style>
