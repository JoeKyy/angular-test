const axios = require('axios');

const getRenegotiations = async (userId) => {
  try {
    const response = await axios.get('http://localhost:3004/renegotiations', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch renegotiations');
  }
};

module.exports = {
  getRenegotiations
};
