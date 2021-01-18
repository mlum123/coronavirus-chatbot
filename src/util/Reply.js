// Reply module handles user's text input and returns appropriate response
// uses functions from Coronavirus module to incorporate U.S. or state stats and info in response if necessary
import Coronavirus from "./Coronavirus";

// responses to frequently asked questions about coronavirus
// attributions:
// https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus
// https://www.cdc.gov/coronavirus/2019-ncov/faq.html
const faq_responses = [
  "According to Johns Hopkins Medicine, 'Coronaviruses are a type of virus. There are many different kinds, and some cause disease. A newly identified coronavirus, SARS-CoV-2, has caused a worldwide pandemic of respiratory illness, called COVID-19.'",
  "According to the CDC, 'The virus that causes COVID-19 most commonly spreads between people who are in close contact with one another (within about 6 feet, or 2 arm lengths). It spreads through respiratory droplets or small particles, such as those in aerosols, produced when an infected person coughs, sneezes, sings, talks, or breathes. These particles can be inhaled into the nose, mouth, airways, and lungs and cause infection. This is thought to be the main way the virus spreads.'",
  "According to Johns Hopkins Medicine, 'COVID-19 appeared in Wuhan, a city in China, in December 2019. Although health officials are still tracing the exact source of this new coronavirus, early hypotheses thought it may be linked to a seafood market in Wuhan, China. Some people who visited the market developed viral pneumonia caused by the new coronavirus. A study that came out on Jan. 25, 2020, notes that the individual with the first reported case became ill on Dec. 1, 2019, and had no link to the seafood market. Investigations are ongoing as to how this virus originated and spread.'",
  "According to Johns Hopkins Medicine, 'COVID-19 symptoms include: Cough, Fever or chills, Shortness of breath or difficulty breathing, Muscle or body aches, Sore throat, New loss of taste or smell, Diarrhea, Headache, New fatigue, Nausea or vomiting, Congestion or runny nose.'",
  "The CDC says, 'Wear masks in public settings when around people not living in your household and particularly where other social distancing measures are difficult to maintain, such as grocery stores, pharmacies, and gas stations. Masks may slow the spread of the virus and help people who may have the virus and do not know it from transmitting it to others. COVID-19 can be spread by people who do not have symptoms and do not know that they are infected. That’s why it’s important for everyone to practice social distancing (staying at least 6 feet away from other people) and wear masks in public settings.'",
  "The CDC says, 'Handwashing is one of the best ways to protect yourself and your family from getting sick. Wash your hands often with soap and water for at least 20 seconds, especially after blowing your nose, coughing, or sneezing; going to the bathroom; and before eating or preparing food. If soap and water are not readily available, use an alcohol-based hand sanitizer with at least 60% alcohol.'",
  "According to Johns Hopkins Medicine, 'As of now, there is not a specific treatment for the virus. People who become sick from COVID-19 should be treated with supportive measures: those that relieve symptoms. For severe cases, there may be additional options for treatment, including research drugs and therapeutics.'",
  "According to the CDC, 'It is not yet known whether weather and temperature affect the spread of COVID-19. Some other viruses, like those that cause the common cold and flu, spread more during cold weather months but that does not mean it is impossible to become sick with these viruses during other months.  There is much more to learn about the transmissibility, severity, and other features associated with COVID-19 and investigations are ongoing.'",
  "The CDC says, 'Wash your hands or use hand sanitizer before putting on your mask. Put the mask over your nose and mouth and secure it under your chin. Fit the mask snugly against the sides of your face, slipping the loops over your ears or tying the strings behind your head. If you have to continually adjust your mask, it doesn’t fit properly, and you might need to find a different mask type or brand. Make sure you can breathe easily.'",
  "If you've come into contact with someone who has COVID-19, the CDC says, 'The best way to protect yourself and others is to stay home for 14 days if you think you’ve been exposed to someone who has COVID-19. Check your local health department’s website for information about options in your area to possibly shorten this quarantine period. Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19. If possible, stay away from others, especially people who are at higher risk for getting very sick from COVID-19.'",
  "The CDC says, 'Look for emergency warning signs* for COVID-19. If someone is showing any of these signs, seek emergency medical care immediately: Trouble breathing, Persistent pain or pressure in the chest, New confusion, Inability to wake or stay awake, Bluish lips or face. *This list is not all possible symptoms. Please call your medical provider for any other symptoms that are severe or concerning to you. Call 911 or call ahead to your local emergency facility: Notify the operator that you are seeking care for someone who has or may have COVID-19.'",
  "According to the CDC, 'Contact tracing has been used for decades by state and local health departments to slow or stop the spread of infectious diseases. Contact tracing slows the spread of COVID-19 by: Letting people know they may have been exposed to COVID-19 and should monitor their health for signs and symptoms of COVID-19, Helping people who may have been exposed to COVID-19 get tested, Asking people to self-isolate if they have COVID-19 or self-quarantine if they are a close contact of someone with COVID-19.'",
];

// responses to state statistics questions
const stats_responses = [
  "[PLACE] has had [positive] coronavirus cases, to date.",
  "[PLACE] had [positiveIncrease] new coronavirus cases, today.",
  "[PLACE] has [hospitalizedCurrently] current coronavirus hospitalizations.",
  "[PLACE] had [hospitalizedIncrease] new coronavirus hospitalizations, today.",
  "[PLACE] has had [death] coronavirus deaths, to date.",
  "[PLACE] had [deathIncrease] new coronavirus deaths, today.",
  "[PLACE] currently has [inIcuCurrently] ICU patients with coronavirus.",
  "[PLACE] has had [recovered] coronavirus patients who recovered, to date.",
];

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const states_abbrev = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const states_abbrev_mapping = {
  Alabama: "AL",
  Alaska: "AK",
  "American Samoa": "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District of Columbia": "DC",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  "Virgin Islands": "VI",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

// TensorFlow.js Universal Sentence Encoder model
// https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

const Reply = {
  // returns chatbot's reponse to user input
  async getChatbotResponse(userInput) {
    // get U.S. and state stats and info from Coronavirus module
    const USStats = await Coronavirus.getUSStats().then((USStats) => {
      return USStats;
    });

    const AllStateStats = await Coronavirus.getAllStateStats().then(
      (AllStateStats) => {
        return AllStateStats;
      }
    );

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
        stats_responses
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

      // get answer that best matches user question
      let answer = possible_responses[scores.indexOf(Math.max(...scores))];

      // check if answer needs additional information (if it's a statistic response)
      if (stats_responses.includes(answer)) {
        // check if user is asking about the U.S.
        if (userInput.toLowerCase().includes("u.s." || "us" || "america")) {
          // fill in blanks for place and statistic in answer string
          answer = answer.replace("[PLACE]", "The U.S.");

          // use regular expression to find statistic to fill in — word with square brackets surrounding it
          const blanks = answer.match(/\[\w+\]/);
          const statName = blanks[0].replace("[", "").replace("]", "");
          const stat = USStats[statName].toLocaleString(); // use toLocaleString to insert comma between every 3 digits
          answer = answer.replace(blanks[0], stat);
        }
        // check if user is asking about a specific state
        else if (
          states.some((state) => Reply.titleCase(userInput).includes(state)) ||
          states_abbrev.some((state_abbrev) =>
            userInput.toUpperCase().includes(state_abbrev)
          )
        ) {
          // fill in blanks for place and statistic in answer string

          // find correct state abbrev for state user is asking about
          let state_abbrev;
          if (
            states.some((state) => Reply.titleCase(userInput).includes(state))
          ) {
            const state = states.find((state) =>
              Reply.titleCase(userInput).includes(state)
            );
            state_abbrev = states_abbrev_mapping[state];
          } else {
            state_abbrev = states_abbrev.find((state_abbrev) =>
              userInput.includes(state_abbrev)
            );
          }

          answer = answer.replace("[PLACE]", state_abbrev);

          // get stats for specified state from all states stats
          const stateStats = AllStateStats.find(
            (stateStats) => stateStats.state === state_abbrev
          );

          // use regular expression to find statistic to fill in — word with square brackets surrounding it
          const blanks = answer.match(/\[\w+\]/);
          const statName = blanks[0].replace("[", "").replace("]", "");
          const stat = stateStats[statName].toLocaleString(); // use toLocaleString to insert comma between every 3 digits
          answer = answer.replace(blanks[0], stat);
        }
      }
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

  // helper function for checking for state names
  // title cases an input string
  titleCase(str) {
    str = str.toLowerCase();
    const strArray = str.split(" ");
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
    }
    return strArray.join(" ");
  },
};

export default Reply;
