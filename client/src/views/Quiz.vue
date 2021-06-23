<template>
  <div id="quiz" class="w-full md:max-w-7xl">
    <h1 class="uppercase text-3xl text-red-500 font-bold mb-2 text-center">
      {{ title }}
    </h1>

    <div v-if="started">
      <div v-for="(question, index) in questions" :key="question.id">
        <div v-show="index === questionIndex">
          <h2>{{ question.text }}</h2>
          <ol>
            <li
              v-for="response in question.responses"
              :key="response.id"
              class="
                border border-red-500
                py-2
                px-4
                input-field
                rounded-full
                mt-4
                mb-4
              "
            >
              <label>
                <input
                  type="radio"
                  v-bind:value="response.score"
                  v-bind:name="index"
                  v-model="userResponses[index]"
                />
                {{ response.text }}
              </label>
            </li>
          </ol>
          <button
            class="
              bg-red-500
              hover:bg-red-700
              text-white
              py-3
              px-4
              rounded
              mr-4
            "
            v-if="questionIndex > 0"
            v-on:click="prev"
          >
            PREVIOUS
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white py-3 px-4 rounded"
            v-on:click="next"
          >
            NEXT
          </button>
        </div>
      </div>
      <div
        v-show="questionIndex === questions.length"
        class="text-center mt-10"
      >
        <div v-if="finished() <= 4" class="flex justify-center">
          <trending-item
            dataType="superhero"
            :id="2048"
            :name="'Wonder Woman'"
            :imageURL="'https://comicvine.gamespot.com/a/uploads/scale_medium/12/124259/7823846-ekkbzkcli3kgfjkr3pfdxe-1280-80.jpg'"
            :type="'quiz'"
          />
        </div>
        <div
          v-if="finished() > 4 && finished() <= 8"
          class="flex justify-center"
        >
          <trending-item
            dataType="superhero"
            :id="1455"
            :name="'Iron Man'"
            :imageURL="'https://comicvine.gamespot.com/a/uploads/scale_medium/11118/111187046/7560188-0157851318-EeSKH3CWkAAiO2j.jpg'"
            :type="'quiz'"
          />
        </div>
        <div
          v-if="finished() > 8 && finished() <= 12"
          class="flex justify-center"
        >
          <trending-item
            dataType="superhero"
            :id="1807"
            :name="'Superman'"
            :imageURL="'https://comicvine.gamespot.com/a/uploads/scale_medium/13/132327/6507037-28872490_1638064799604695_1250122498385004714_n.jpg'"
            :type="'quiz'"
          />
        </div>
        <div
          v-if="finished() > 12 && finished() <= 16"
          class="flex justify-center"
        >
          <trending-item
            dataType="superhero"
            :id="1442"
            :name="'Captain America'"
            :imageURL="'https://comicvine.gamespot.com/a/uploads/scale_medium/5/57023/7391162-cap%20by%20alex%20ross.jpg'"
            :type="'quiz'"
          />
        </div>
        <div v-if="finished() > 16" class="flex justify-center">
          <trending-item
            dataType="superhero"
            :id="2267"
            :name="'Hulk'"
            :imageURL="'https://comicvine.gamespot.com/a/uploads/scale_medium/12/124259/7892286-immortal_hulk_vol_1_38_.jpg'"
            :type="'quiz'"
          />
        </div>

        <p>
          <button
            class="
              bg-red-500
              hover:bg-red-700
              text-white
              py-3
              px-4
              rounded
              mt-10
            "
            v-on:click="restart"
          >
            RESTART
          </button>
        </p>
      </div>
    </div>
    <div v-else class="text-center mt-10">
      <button
        class="bg-red-500 hover:bg-red-700 text-white py-3 px-4 rounded"
        v-on:click="start"
      >
        START
      </button>
    </div>
  </div>
</template>

<script>
import TrendingItem from "../components/TrendingItem.vue";
export default {
  name: "Quiz",
  components: { TrendingItem },
  data() {
    return {
      title: "Which superhero are you?",
      questions: [
        {
          id: 1,
          text: "What do you think is the most important skill?",
          responses: [
            { text: "Strength/Power", score: 0 },
            { text: "The ability to control your anger", score: 4 },
            { text: "Intelligence", score: 1 },
            { text: "Combat", score: 3 },
            { text: "Every skill is important", score: 2 },
          ],
        },
        {
          id: 2,
          text: "How would you describe yourself?",
          responses: [
            { text: "I have only one weakness", score: 2 },
            { text: "I am very loyal to my country", score: 3 },
            { text: "I am a genius!", score: 1 },
            { text: "I am quite independent", score: 0 },
            { text: "I can be pretty strong in certain situations", score: 4 },
          ],
        },
        {
          id: 3,
          text: "Do you get angry often?",
          responses: [
            { text: "If I do, it's a disaster", score: 4 },
            { text: "Not really", score: 0 },
            { text: "Yeah, it can happen", score: 3 },
            { text: "Sometimes", score: 1 },
            { text: "It depends", score: 2 },
          ],
        },
        {
          id: 4,
          text: "Do you like gadgets?",
          responses: [
            { text: "They could be helpful", score: 3 },
            { text: "I don't really need any", score: 4 },
            { text: "A cape would be nice", score: 2 },
            { text: "Yes, they can be nice", score: 0 },
            { text: "Of course! I can’t live without them!", score: 1 },
          ],
        },
        {
          id: 5,
          text: "What is your biggest weakness?",
          responses: [
            { text: "A certain type of mineral…", score: 2 },
            { text: "Certain gadgets", score: 0 },
            { text: "My ego", score: 3 },
            { text: "My anger", score: 4 },
            { text: "Myself", score: 1 },
          ],
        },
      ],
      questionIndex: 0,
      userResponses: Array(5).fill(),
      started: false,
    };
  },
  methods: {
    start() {
      if (!this.userResponses[this.questionIndex]) {
        this.userResponses[this.questionIndex] = 0;
      }
      this.started = true;
    },
    next() {
      this.questionIndex++;
      if (!this.userResponses[this.questionIndex]) {
        this.userResponses[this.questionIndex] = 0;
      }
    },
    prev() {
      this.questionIndex--;
    },
    restart() {
      location.reload();
    },
    finished() {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score = score + this.userResponses[i];
      }
      return score;
    },
  },
};
</script>
