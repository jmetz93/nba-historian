const httpStatus = require('http-status');
const axios = require('axios');
const { ballDontLieApiUrl } = require('../config');
const { ApiError } = require('../utils');

/**
 * Search ballDontLie api for players matching name
 * @param {string} playername
 * @param {number} page
 * @returns {Promise<Object>}
 */
const searchForPlayers = async (playerName, page = 1) => {
  try {
    const { data } = await axios.get(`${ballDontLieApiUrl}/players?search=${playerName}&page=${page}`);
    return data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get all teams from api
 * @returns {Promise<Object>}
 */
const getTeams = async () => {
  try {
    const { data } = await axios.get(`${ballDontLieApiUrl}/teams`);
    return data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get past season stats on player, will not work for players who didn't play this past season
 * @param {string} playerId
 * @returns {Promise<Object>}
 */
const getSeasonStats = async (playerId) => {
  try {
    const { data } = await axios.get(`${ballDontLieApiUrl}/season_averages?player_ids[]=${playerId}`);
    return data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  searchForPlayers,
  getTeams,
  getSeasonStats
};