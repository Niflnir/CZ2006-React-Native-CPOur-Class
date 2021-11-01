import GetData from "../api/GetData";

/**
 * Retrieved carpark lot availability information from API
 * @property {*} lotData Data retreived from API call
 */
export default class GetLots {
  #lotData;
  /**
   * Uses GetData.getData() to make API call and store carpark lot availability data
   * @returns {*} Data retrieved from API
   */
  async getLots() {
    console.log("getting lot availability");
    var today = new Date();
    var time = today.toString().split(" ")[4];
    var dateTime = today.toISOString().slice(0, 10) + "T" + time;

    const URL =
      "https://api.data.gov.sg/v1/transport/carpark-availability?date_time=" +
      dateTime;

    const getData = new GetData(URL);

    await getData
      .getData(URL)
      .then((data) => {
        this.#lotData = data;
      })
      .catch((err) => console.log(err, URL));

    return this.#lotData["items"][0]["carpark_data"];
  }
}
