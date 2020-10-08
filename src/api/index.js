const getRandomText = async (quantity = 1) => {
  return fetch(`https://api.icndb.com/jokes/random/${quantity}-`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.value;
    })
    .catch((error) => {
      return error.diagnostic.message;
    });
};

const Api = {
  getRandomText,
};

export default Api;
