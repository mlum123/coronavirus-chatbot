// Reply module handles user's text input and returns appropriate response
// uses functions from Coronavirus module to incorporate U.S. or state stats and info in response if necessary
import Coronavirus from "./Coronavirus";

// responses to frequently asked questions about coronavirus
// attribution: https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus
const faq_responses = [
  "Coronaviruses are a type of virus. There are many different kinds, and some cause disease. A newly identified coronavirus, SARS-CoV-2, has caused a worldwide pandemic of respiratory illness, called COVID-19.",
  "As of now, researchers know that the new coronavirus is spread through droplets released into the air when an infected person coughs or sneezes. The droplets generally do not travel more than a few feet, and they fall to the ground (or onto surfaces) in a few seconds — this is why physical distancing is effective in preventing the spread.",
  "COVID-19 appeared in Wuhan, a city in China, in December 2019. Although health officials are still tracing the exact source of this new coronavirus, early hypotheses thought it may be linked to a seafood market in Wuhan, China. Some people who visited the market developed viral pneumonia caused by the new coronavirus. A study that came out on Jan. 25, 2020, notes that the individual with the first reported case became ill on Dec. 1, 2019, and had no link to the seafood market. Investigations are ongoing as to how this virus originated and spread.",
  "COVID-19 symptoms include: Cough, Fever or chills, Shortness of breath or difficulty breathing, Muscle or body aches, Sore throat, New loss of taste or smell, Diarrhea, Headache, New fatigue, Nausea or vomiting, Congestion or runny nose.",
  "As of now, there is not a specific treatment for the virus. People who become sick from COVID-19 should be treated with supportive measures: those that relieve symptoms. For severe cases, there may be additional options for treatment, including research drugs and therapeutics.",
];

const Reply = {
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

  // function that returns chatbot's reponse to user input
  getChatbotResponse(userInput) {
    return "HELLOOO HELLOO";
  },
};

export default Reply;
