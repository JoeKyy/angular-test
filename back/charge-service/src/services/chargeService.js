const axios = require('axios');

const getCharges = async () => {
  try {
    const response = await axios.get('http://localhost:3004/charges');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch charges');
  }
};

module.exports = {
  getCharges
};
