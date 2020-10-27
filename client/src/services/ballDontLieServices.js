import api, { GET } from './api';

export const searchPlayers = (player, page) => api({
  path: `v1/ballDontLie/players?player=${player}&page=${page}`,
  method: GET,
});

export const getTeams = () => api({
  path: `v1/ballDontLie/teams`,
  method: GET,
});

export const getStats = (playerId) => api({
  path: `v1/ballDontLie/playerStats?playerId=${playerId}`,
  method: GET,
});