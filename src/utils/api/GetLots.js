// To access carpark lot availability API and return data

import GetData from "../api/GetData";

export default class GetLots {
  #lotData;
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
      .catch((error) => console.log(error));

    return this.#lotData["items"][0]["carpark_data"];
  }
}
