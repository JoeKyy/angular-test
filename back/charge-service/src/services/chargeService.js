const axios = require('axios');

const getCharges = async (userId) => {
  try {
    const response = await axios.get('http://localhost:3004/charges', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch charges');
  }
};

module.exports = {
  getCharges
};
