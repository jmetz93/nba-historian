const httpStatus = require('http-status');
const axios = require('axios');
const { ballDontLieApiUrl } = require('../config');
const { ApiError } = require('../utils');

const searchForPlayers = async (playerName, page = 1) => {
  try {
    const { data } = await axios.get(`${ballDontLieApiUrl}/players?search=${playerName}&page=${page}`);
    return data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  searchForPlayers
};