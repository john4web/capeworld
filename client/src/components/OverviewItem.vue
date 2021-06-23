<template>
  <div
    class="
      m-4
      p-4
      shadow-md
      border
      bg-white
      w-60
      text-gray-700
      overflow-hidden
      overview-item
      flex-row
    "
  >
    <div class="float-right text justify-center">
      <router-link
        :to="`/${dataType}/${id}`"
        class="uppercase text-gray-900 hover:text-red-500"
      >
        <h1 class="uppercase">{{ name }}</h1></router-link
      >
    </div>
    <div
      v-if="imageURL"
      class="float-left justify-center overflow-hidden image inline-block mr-2"
      :style="{ backgroundImage: 'url(' + imageURL + ')' }"
    ></div>
    <div
      v-else
      class="
        float-left
        justify-center
        overflow-hidden
        inline-block
        mr-2
        placeholder
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: "Overview",
  props: ["dataType", "id", "name", "imageURL"],
};
</script>

<style scoped>
.overview-item {
  height: 135px;
}
.image {
  width: 80px;
  height: 100px;
  background-position-y: 50%;
  background-position-x: 50%;
  background-size: 100%;
}
.placeholder {
  width: 80px;
  height: 100px;
  background-position-y: 50%;
  background-position-x: 50%;
  background: url(../assets/placeholder.png);
}
.text {
  width: 115px;
  height: 100px;
  overflow-wrap: break-word;
}
</style>