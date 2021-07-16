<template>
  <div id="app" class="">
    <header class="w-full flex flex-col">
      <nav
        id="navbar"
        class="
          p-4
          flex flex-col
          sm:flex-row
          w-full
          justify-between
          items-center
          bg-gray-900
          border-b-2 border-red-500
        "
      >
        <div
          class="
            w-full
            md:w-auto
            flex flex-row
            md:flex-none
            flex-no-wrap
            justify-between
            items-center
          "
        >
          <router-link to="/">
            <img class="logo" src="./assets/logo_alternative.png" alt="logo" />
          </router-link>
          <button
            class="hamburger block md:hidden"
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
          class="
            w-full
            sm:w-auto
            self-end
            sm:self-center
            flex-col
            sm:flex-row
            items-center
            h-full
            md:block
          "
          :class="{ hidden: isHidden, flex: isFlex }"
        >
          <router-link
            to="/"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >Home</router-link
          >
          <router-link
            to="/superheroes"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >Superheroes</router-link
          >
          <router-link
            to="/comics"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >Comics</router-link
          >
          <router-link
            to="/movies"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >Movies</router-link
          >
          <router-link
            to="/people"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >People</router-link
          >
          <router-link
            to="/legal"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >Legal Notice</router-link
          >
          <router-link
            to="/quiz"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >Quiz</router-link
          >
          <router-link
            to="/about"
            class="uppercase text-white hover:text-red-500 m-4"
            @click.native="resetToggle"
            >About</router-link
          >
        </div>
      </nav>
      <div class="banner bg-black w-full flex justify-center">
        <div class="items-center w-full flex justify-center">
          <div class="absolute header-info">
            <h1
              class="
                z-50
                relative
                uppercase
                text-5xl
                font-bold
                text-white text-center
              "
            >
              Capeworld
            </h1>
            <div v-if="randomQuote" class="z-50 relative text-center quote">
              <p class="text-lg mt-4 italic font-bold text-white">
                {{ randomQuote.quote }}
              </p>
              <router-link :to="`/superhero/${randomQuote.author.id}`">
                <p class="text-red-500 mb-4">- {{ randomQuote.author.name }}</p>
              </router-link>
            </div>
            <router-link
              to="/superheroes"
              class="
                uppercase
                text-white
                hover:text-red-500
                flex
                justify-center
                z-50
                relative
                header-button
              "
            >
              <button
                class="
                  bg-red-500
                  hover:bg-red-700
                  text-white
                  uppercase
                  py-2
                  px-4
                  rounded
                "
              >
                Find Superhero
              </button></router-link
            >
          </div>
          <div class="banner grid headerimages">
            <div
              class="bg-red-500 one images"
              :style="{ backgroundImage: 'url(' + headerImages[0] + ')' }"
            ></div>
            <div
              class="bg-green-500 two images"
              :style="{ backgroundImage: 'url(' + headerImages[1] + ')' }"
            ></div>
            <div
              class="bg-blue-500 three images"
              :style="{ backgroundImage: 'url(' + headerImages[2] + ')' }"
            ></div>
            <div
              class="bg-red-500 four images"
              :style="{ backgroundImage: 'url(' + headerImages[3] + ')' }"
            ></div>
            <div
              class="bg-green-500 five images"
              :style="{ backgroundImage: 'url(' + headerImages[4] + ')' }"
            ></div>
          </div>
        </div>
      </div>
    </header>
    <div id="content" class="m-4 flex justify-center min-height-130px">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style>
.min-height-130px {
  min-height: 130px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.hamburger {
  width: 25px;
}
.logo {
  width: 30px;
}
.banner {
  height: 500px;
  width: 100%;
}
.title-container {
  width: 300px;
}
a.router-link-exact-active {
  color: rgba(239, 68, 68);
}

.headerimages {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 115px);
  gap: 10px;
}

.one {
  grid-column: 1/3;
  grid-row: 1/4;
}
.two {
  grid-row: 1/3;
}
.five {
  grid-column: 4/2;
}
.images {
  filter: grayscale(100%);
  background-size: cover;
  background-blend-mode: multiply;
  background-position: right;
}
.header-info {
  margin-top: 150px;
}
</style>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      isOpen: false,
      isHidden: true,
      isFlex: false,
      headerImages: [],
      randomQuote: null,
    };
  },
  mounted: async function () {
    try {
      const response = await axios.get(`/api/randomcomicimages/5`);
      this.headerImages = response.data;
      const responseRandomQuote = await axios.get(`/api/quote`);
      this.randomQuote = responseRandomQuote.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    navToggle: function () {
      this.isOpen = !this.isOpen;
      this.isHidden = !this.isHidden;
      this.isFlex = !this.isFlex;
    },
    resetToggle: function () {
      this.isOpen = false;
      this.isHidden = true;
      this.isFlex = false;
    },
  },
};
</script>



