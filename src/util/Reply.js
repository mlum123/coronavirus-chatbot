// Reply module handles user's text input and returns appropriate response
// uses functions from Coronavirus module to incorporate U.S. or state stats and info in response if necessary
import Coronavirus from "./Coronavirus";

// responses to frequently asked questions about coronavirus
// attribution: https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus
const faq_responses = [
  "According to Johns Hopkins Medicine, 'Coronaviruses are a type of virus. There are many different kinds, and some cause disease. A newly identified coronavirus, SARS-CoV-2, has caused a worldwide pandemic of respiratory illness, called COVID-19.'",
  "According to Johns Hopkins Medicine, 'As of now, researchers know that the new coronavirus is spread through droplets released into the air when an infected person coughs or sneezes. The droplets generally do not travel more than a few feet, and they fall to the ground (or onto surfaces) in a few seconds — this is why physical distancing is effective in preventing the spread.'",
  "According to Johns Hopkins Medicine, 'COVID-19 appeared in Wuhan, a city in China, in December 2019. Although health officials are still tracing the exact source of this new coronavirus, early hypotheses thought it may be linked to a seafood market in Wuhan, China. Some people who visited the market developed viral pneumonia caused by the new coronavirus. A study that came out on Jan. 25, 2020, notes that the individual with the first reported case became ill on Dec. 1, 2019, and had no link to the seafood market. Investigations are ongoing as to how this virus originated and spread.'",
  "According to Johns Hopkins Medicine, 'COVID-19 symptoms include: Cough, Fever or chills, Shortness of breath or difficulty breathing, Muscle or body aches, Sore throat, New loss of taste or smell, Diarrhea, Headache, New fatigue, Nausea or vomiting, Congestion or runny nose.'",
  "According to Johns Hopkins Medicine, 'As of now, there is not a specific treatment for the virus. People who become sick from COVID-19 should be treated with supportive measures: those that relieve symptoms. For severe cases, there may be additional options for treatment, including research drugs and therapeutics.'",
];

// responses to U.S. or state coronavirus statistics questions
let place = "";
let cases = 0; // positive
let cases_new = 0; // positiveIncrease
let hospitalizations = 0; // hospitalizedCurrently
let hospitalizations_new = 0; // hospitalizedIncrease
let deaths = 0; // death
let deaths_new = 0; // deathIncrease
let icu = 0; // inIcuCurrently
let icu_capacity = "";
let recovered = 0; // recovered
const stats_responses = [
  `${place} has had ${cases} coronavirus cases, to date.`,
  `${place} had ${cases_new} new coronavirus cases, today.`,
  `${place} has ${hospitalizations} current coronavirus hospitalizations.`,
  `${place} had ${hospitalizations_new} new coronavirus hospitalizations, today.`,
  `${place} has had ${deaths} coronavirus deaths, to date.`,
  `${place} had ${deaths_new} new coronavirus deaths, today.`,
  `${place} currently has ${icu} ICU patients with coronavirus.`,
  `${place} currently has an ICU capacity of ${icu_capacity}.`,
  `${place} has had ${recovered} coronavirus patients who recovered, to date.`,
];

// responses to state info questions
let state = "";
let website = ""; // covid19Site
let twitter = ""; // twitter
const state_info_responses = [
  `${state}'s COVID-19 website is ${website}.`,
  `${state}'s COVID-19 Twitter handle is ${twitter}.`,
];

// TensorFlow.js Universal Sentence Encoder model
// https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

const Reply = {
  // returns chatbot's reponse to user input
  getChatbotResponse(userInput) {
    // use TensorFlow.js Universal Sentence Encoder QnA dual encoder
    // Load the model.
    return use.loadQnA().then((model) => {
      // handle blank user input
      if (userInput === "") {
        return "Ask me a question about COVID-19, and I'll do my best to answer it.";
      }

      // Embed a dictionary of a query and responses. The input to the embed method
      // needs to be in following format:
      // {
      //   queries: string[];
      //   responses: Response[];
      // }
      // queries is an array of question strings
      // responses is an array of following structure:
      // {
      //   response: string;
      //   context?: string;
      // }
      // context is optional, it provides the context string of the answer.

      let possible_responses = [];
      possible_responses = possible_responses.concat(
        faq_responses,
        stats_responses,
        state_info_responses
      );
      const input = {
        queries: [userInput],
        responses: possible_responses,
      };
      var scores = [];
      const embeddings = model.embed(input);
      /*
       * The output of the embed method is an object with two keys:
       * {
       *   queryEmbedding: tf.Tensor;
       *   responseEmbedding: tf.Tensor;
       * }
       * queryEmbedding is a tensor containing embeddings for all queries.
       * responseEmbedding is a tensor containing embeddings for all answers.
       * You can call `arraySync()` to retrieve the values of the tensor.
       */
      const embed_query = embeddings["queryEmbedding"].arraySync();
      const embed_responses = embeddings["responseEmbedding"].arraySync();
      // compute the dotProduct of each query and response pair.
      for (let i = 0; i < input["queries"].length; i++) {
        for (let j = 0; j < input["responses"].length; j++) {
          scores.push(Reply.dotProduct(embed_query[i], embed_responses[j]));
        }
      }

      const answer = possible_responses[scores.indexOf(Math.max(...scores))];

      return answer;
    });
  },

  // helper function for finding best answer using TensorFlow.js model
  // Calculate the dot product of two vector arrays.
  dotProduct(xs, ys) {
    const sum = (xs) => (xs ? xs.reduce((a, b) => a + b, 0) : undefined);

    return xs.length === ys.length
      ? sum(Reply.zipWith((a, b) => a * b, xs, ys))
      : undefined;
  },

  // helper function for finding best answer using TensorFlow.js model
  // zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
  zipWith(f, xs, ys) {
    const ny = ys.length;
    return (xs.length <= ny ? xs : xs.slice(0, ny)).map((x, i) => f(x, ys[i]));
  },

  // functions for getting U.S. and state stats and info from Coronavirus module
  getUSStats() {
    Coronavirus.getUSStats().then((USStats) => {
      return USStats;
    });
  },

  getStateStats(state) {
    Coronavirus.getStateStats(state).then((StateStats) => {
      return StateStats;
    });
  },

  getStateInfo(state) {
    Coronavirus.getStateInfo(state).then((StateInfo) => {
      return StateInfo;
    });
  },
};

export default Reply;
