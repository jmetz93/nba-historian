const httpStatus = require('http-status');
const { ballDontLieService } = require('../services');
const { catchAsync } = require('../utils');

const getPlayers = catchAsync(async (req, res) => {
  const { player, page } = req.query;
  const playerResults = await ballDontLieService.searchForPlayers(player, page);
  res.status(httpStatus.OK).send({ playerResults });
});

const getAllTeams = catchAsync(async (req, res) => {
  const teamInfo = await ballDontLieService.getTeams();
  res.status(httpStatus.OK).send({ teamInfo }); 
});

const getPlayerStats = catchAsync(async (req, res) => {
  const { playerId } = req.query;
  const playerStats = await ballDontLieService.getSeasonStats(playerId);
  res.status(httpStatus.OK).send({ playerStats });
}); 


module.exports = {
  getPlayers,
  getAllTeams,
  getPlayerStats,
};