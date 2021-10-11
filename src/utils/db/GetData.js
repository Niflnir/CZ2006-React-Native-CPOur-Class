// Makes actual API calls

const GetData = async (URL) => {
  // "async" used so can wait for different steps of program to complete using "await" operator
  // otherwise might return to calling function before API call complete

  const response = await fetch(URL); // to ensure api call is completed before reponse stored

  if (response.status !== 200) {
    // if got any response status other than 200 (i.e. request is unsuccessful)
    throw new Error("Cannot fetch data " + response.status);
  }
  const data = await response.json();
  return data;
};

export default GetData;
