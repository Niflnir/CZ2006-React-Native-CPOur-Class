/**
 * Handles API related services
 */
class ApiServices {
  /**
   * Makes API calls
   * @param {string} url Url to be used to make API calls
   * @returns {Object} Data retreived from API
   */
  async getData(url) {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("Cannot fetch data " + response.status);
    }
    const data = await response.json();
    return data;
  }

  #lotData;
  /**
   * Uses getData() to make API call and store carpark lot availability data
   * @returns {Object} Data retrieved from API
   */
  async getLots() {
    console.log("getting lot availability");
    var today = new Date();
    var time = today.toString().split(" ")[4];
    var dateTime = today.toISOString().slice(0, 10) + "T" + time;

    const URL =
      "https://api.data.gov.sg/v1/transport/carpark-availability?date_time=" +
      dateTime;

    await this.getData(URL)
      .then((data) => {
        this.#lotData = data;
      })
      .catch((err) => console.log(err, URL));

    return this.#lotData["items"][0]["carpark_data"];
  }
}

export default ApiServices;
