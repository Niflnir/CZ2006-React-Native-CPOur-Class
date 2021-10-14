export default class GetData {
  constructor(URL) {
    this.url = URL;
  }
  async getData() {
    // "async" used so can wait for different steps of program to complete using "await" operator
    // otherwise might return to calling function before API call complete    const response = await fetch(this.url); // to ensure api call is completed before reponse stored
    const response = await fetch(this.url); // to ensure api call is completed before reponse stored

    if (response.status !== 200) {
      // if got any response status other than 200 (successful)
      throw new Error("Cannot fetch data " + response.status);
    }
    const data = await response.json();
    return data;
  }
}
