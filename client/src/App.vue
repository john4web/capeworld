<template>
  <div id="app" class="">
    <header class="w-full flex flex-col">
      <nav
        id="navbar"
        class="p-4 flex flex-col sm:flex-row w-full justify-between items-center bg-gray-900 border-b-2 border-red-500"
      >
        <div
          class="w-full sm:w-auto flex flex-row sm:flex-none flex-no-wrap justify-between items-center"
        >
          <router-link to="/">
            <img class="logo" src="./assets/cape.svg" alt="logo" />
          </router-link>
          <button
            class="hamburger block sm:hidden"
            :class="{ open: isOpen }"
            @click="navToggle"
          >
            <img
              class="hamburger"
              src="./assets/hamburger.svg"
              alt="hamburger"
            />
          </button>
        </div>
        <div
          class="w-full sm:w-auto self-end sm:self-center flex-col sm:flex-row items-center h-full md:block"
          :class="{ hidden: isHidden, flex: isFlex }"
        >
          <router-link
            to="/"
            class="uppercase text-white hover:text-red-500 m-4"
            >Home</router-link
          >
          <router-link
            to="/superheroes"
            class="uppercase text-white hover:text-red-500 m-4"
            >Superheroes</router-link
          >
          <router-link
            to="/comics"
            class="uppercase text-white hover:text-red-500 m-4"
            >Comics</router-link
          >
          <router-link
            to="/movies"
            class="uppercase text-white hover:text-red-500 m-4"
            >Movies</router-link
          >
          <router-link
            to="/legal"
            class="uppercase text-white hover:text-red-500 m-4"
            >Legal Notice</router-link
          >
        </div>
      </nav>
      <div class="banner w-full flex justify-center">
        <div class="items-center title-container">
          <h1 class="title uppercase text-5xl font-bold text-white text-center">
            Capeworld
          </h1>
          <router-link
            to="/superheroes"
            class="uppercase text-white hover:text-red-500 m-4 flex justify-center"
          >
            <button
              class="bg-gray-900 hover:bg-gray-800 text-white uppercase py-2 px-4 m-4 rounded"
            >
              Find Superhero
            </button></router-link
          >
        </div>
      </div>
    </header>

    <div id="content" class="m-4 flex justify-center"><router-view /></div>
  </div>
</template>

<style>
.hamburger {
  width: 25px;
}
.logo {
  width: 30px;
}
.banner {
  height: 500px;
  background: url("./assets/header.jpg") rgba(239, 68, 68, 0.5);
  background-size: cover;
  background-blend-mode: multiply;
  background-position: right;
}
.title-container {
  width: 300px;
}
.title {
  margin-top: 75%;
}
</style>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isOpen: false,
      isHidden: true,
      isFlex: false,
    };
  },
  methods: {
    navToggle: function () {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
      if (this.isHidden) {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }
      if (this.isFlex) {
        this.isFlex = false;
      } else {
        this.isFlex = true;
      }
    },
  },
};
</script>



