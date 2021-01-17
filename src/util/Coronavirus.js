// Coronavirus module for making requests to the Atlantic's Covid Tracking Project API
const baseUrl = "https://api.covidtracking.com";

const Coronavirus = {
  // gets current stats for U.S.
  getUSStats() {
    return fetch(`${baseUrl}/v1/us/current.json`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return jsonResponse[0];
      });
  },

  // gets current stats for all states
  getAllStateStats() {
    return fetch(`${baseUrl}/v1/states/current.json`).then((response) => {
      return response.json();
    });
  },
};

export default Coronavirus;
