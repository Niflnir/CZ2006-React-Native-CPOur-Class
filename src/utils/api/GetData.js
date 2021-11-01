/**
 * Makes API calls
 */
export default class GetData {
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
}
