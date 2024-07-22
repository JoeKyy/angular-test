const axios = require('axios');

const getRenegotiations = async () => {
  try {
    const response = await axios.get('http://localhost:3004/renegotiations');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch renegotiations');
  }
};

module.exports = {
  getRenegotiations
};
