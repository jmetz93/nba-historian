const { ballDontLieService } = require('../services');
const { catchAsync } = require('../utils');

const getPlayers = catchAsync(async (req, res) => {
  const { player, page } = req.query;
  const playerResults = await ballDontLieService.searchForPlayers(player, page);
  res.send({ playerResults });
});

module.exports = {
  getPlayers
};