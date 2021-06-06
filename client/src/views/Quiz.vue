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
        <h2>Quiz finished</h2>
        <p>Total score: {{ finished() }}</p>
        <p v-if="finished() <= 4">You are Hero 1</p>
        <p v-if="finished() > 4 && finished() <= 8">You are Hero 2</p>
        <p v-if="finished() > 8 && finished() <= 12">You are Hero 3</p>
        <p v-if="finished() > 12 && finished() <= 16">You are Hero 4</p>
        <p v-if="finished() > 16">You are Hero 5</p>
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
export default {
  name: "Quiz",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      title: "Which superhero are you?",
      questions: [
        {
          id: 1,
          text: "Question 1",
          responses: [
            { text: "Answer 0 Points", score: 0 },
            { text: "Answer 1 Point", score: 1 },
            { text: "Answer 2 Points", score: 2 },
            { text: "Answer 3 Points", score: 3 },
            { text: "Answer 4 Points", score: 4 },
          ],
        },
        {
          id: 2,
          text: "Question 2",
          responses: [
            { text: "Answer 0 Points", score: 0 },
            { text: "Answer 1 Point", score: 1 },
            { text: "Answer 2 Points", score: 2 },
            { text: "Answer 3 Points", score: 3 },
            { text: "Answer 4 Points", score: 4 },
          ],
        },
        {
          id: 3,
          text: "Question 3",
          responses: [
            { text: "Answer 0 Points", score: 0 },
            { text: "Answer 1 Point", score: 1 },
            { text: "Answer 2 Points", score: 2 },
            { text: "Answer 3 Points", score: 3 },
            { text: "Answer 4 Points", score: 4 },
          ],
        },
        {
          id: 4,
          text: "Question 4",
          responses: [
            { text: "Answer 0 Points", score: 0 },
            { text: "Answer 1 Point", score: 1 },
            { text: "Answer 2 Points", score: 2 },
            { text: "Answer 3 Points", score: 3 },
            { text: "Answer 4 Points", score: 4 },
          ],
        },
        {
          id: 5,
          text: "Question 5",
          responses: [
            { text: "Answer 0 Points", score: 0 },
            { text: "Answer 1 Point", score: 1 },
            { text: "Answer 2 Points", score: 2 },
            { text: "Answer 3 Points", score: 3 },
            { text: "Answer 4 Points", score: 4 },
          ],
        },
      ],
      questionIndex: 0,
      userResponses: Array(5).fill(),
      started: false,
    };
  },
  mounted() {},
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

<style scoped>
</style>