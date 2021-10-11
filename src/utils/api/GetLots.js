// To access carpark lot availability API and return data

import GetData from "../db/GetData";
var lotData;

const getLots = async () => {
  console.log("getting lot availability");
  var today = new Date();
  var time = today.toString().split(" ")[4];
  var dateTime = today.toISOString().slice(0, 10) + "T" + time;
  const URL =
    "https://api.data.gov.sg/v1/transport/carpark-availability?date_time=" +
    dateTime;
  await GetData(URL)
    .then((data) => {
      lotData = data;
    })
    .catch((error) => console.log(error));

  return lotData["items"][0]["carpark_data"];
};

export default getLots;
