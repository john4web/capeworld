<template>
  <div id="quiz">
    <h1>{{ title }}</h1>
    <div v-if="started">
      <div v-for="(question, index) in questions" :key="question.id">
        <div v-show="index === questionIndex">
          <h2>{{ question.text }}</h2>
          <ol>
            <li v-for="response in question.responses" :key="response.id">
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
          <button v-if="questionIndex > 0" v-on:click="prev">prev</button>
          <button v-on:click="next">next</button>
        </div>
      </div>
      <div v-show="questionIndex === questions.length">
        <h2>Quiz finished</h2>
        <p>Total score: {{ finished() }}</p>
      </div>
    </div>
    <div v-else>
      <button v-on:click="start">Start</button>
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
        this.userResponses[this.questionIndex] = 1;
      }
      this.started = true;
    },
    next() {
      this.questionIndex++;
      if (!this.userResponses[this.questionIndex]) {
        this.userResponses[this.questionIndex] = 1;
      }
    },
    prev() {
      this.questionIndex--;
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